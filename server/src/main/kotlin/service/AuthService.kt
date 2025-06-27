package com.m3sy.ktor.explorer.cultural.service


import com.m3sy.ktor.explorer.cultural.dto.auth.request.AuthRequest
import com.m3sy.ktor.explorer.cultural.dto.auth.response.AuthResponse
import com.m3sy.ktor.explorer.cultural.dto.user.UserMapper
import com.m3sy.ktor.explorer.cultural.dto.user.request.CreateUserDto
import com.m3sy.ktor.explorer.cultural.model.User
import com.m3sy.ktor.explorer.cultural.repository.UserRepository
import com.m3sy.ktor.explorer.cultural.security.JwtTokenProvider
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val jwtProvider: JwtTokenProvider,
    private val userMapper: UserMapper
) {
    private val encoder = BCryptPasswordEncoder()

    fun signup(dto: CreateUserDto): AuthResponse {
        if (userRepository.findByEmail(dto.email) != null)
            throw RuntimeException("Username already exists")
        val user = User(lastName = dto.lastName, firstName = dto.firstName, email = dto.email, password = encoder.encode(dto.password), role = User.Role.USER, status = User.Status.ACTIVE)
        userRepository.save(user)
        val token = jwtProvider.createToken(user.email, user.role.name)
        return AuthResponse(token, token, userMapper.toResponse(user))
    }

    fun login(dto: AuthRequest): AuthResponse {
        val user = userRepository.findByEmail(dto.email)
            ?: throw RuntimeException("Invalid credentials")
        if (!encoder.matches(dto.password, user.password))
            throw RuntimeException("Invalid credentials")

        val accessToken = jwtProvider.createToken(user.email, user.role.name)
        val refreshToken = jwtProvider.createRefreshToken(user.email)

        user.refreshToken = refreshToken
        userRepository.save(user)

        return AuthResponse(accessToken, refreshToken, userMapper.toResponse(user))
    }

    fun logout(email: String) {
        val user = userRepository.findByEmail(email)
            ?: throw RuntimeException("User not found")
        user.refreshToken = null
        userRepository.save(user)
    }

    fun validateTokenAndGetUsername(refreshToken: String): AuthResponse {

        val email = jwtProvider.validateTokenAndGetUsername(refreshToken)
        val user = userRepository.findByEmail(email)
            ?: throw RuntimeException("User not found")

        if (user.refreshToken != refreshToken || jwtProvider.isExpired(refreshToken))
            throw RuntimeException("Invalid or expired refresh token")

        val accessToken = jwtProvider.createToken(user.email, user.role.name)
        return AuthResponse(accessToken, refreshToken, userMapper.toResponse(user))
    }
}