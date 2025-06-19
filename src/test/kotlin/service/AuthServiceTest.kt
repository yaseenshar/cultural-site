package com.m3sy.ktor.explorer.cultural.service

import com.m3sy.ktor.explorer.cultural.config.JwtConfig
import com.m3sy.ktor.explorer.cultural.dto.user.request.CreateUserDto
import com.m3sy.ktor.explorer.cultural.repository.UserRepository
import com.m3sy.ktor.explorer.cultural.security.JwtTokenProvider
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class AuthServiceTest {
    private val jwtProvider = JwtTokenProvider(JwtConfig())
    private val repo = mockk<UserRepository>()
    private val authService = AuthService(repo, jwtProvider)

    @Test fun `signup creates token`() {
        every { repo.findByUsername(any()) } returns null
        every { repo.save(any()) } answers { firstArg() }
        val resp =  authService.signup(CreateUserDto("u", "pass123"))
        assertNotNull(resp.token)
    }
}