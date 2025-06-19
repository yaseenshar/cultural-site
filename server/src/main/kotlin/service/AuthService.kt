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
        val user = User(lastName = dto.lastName, firstName = dto.firstName, email = dto.email, password = encoder.encode(dto.password), status = User.Status.ACTIVE)
        userRepository.save(user)
        val token = jwtProvider.createToken(user.email)
        return AuthResponse(token, token, userMapper.toResponse(user))
    }

    fun login(dto: AuthRequest): AuthResponse {
        val user = userRepository.findByEmail(dto.email)
            ?: throw RuntimeException("Invalid credentials")
        if (!encoder.matches(dto.password, user.password))
            throw RuntimeException("Invalid credentials")
        val token = jwtProvider.createToken(user.email)
        return AuthResponse(token, token, userMapper.toResponse(user))
    }
}