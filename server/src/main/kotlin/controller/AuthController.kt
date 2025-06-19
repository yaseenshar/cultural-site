package com.m3sy.ktor.explorer.cultural.controller

import com.m3sy.ktor.explorer.cultural.dto.auth.request.AuthRequest
import com.m3sy.ktor.explorer.cultural.dto.auth.response.AuthResponse
import com.m3sy.ktor.explorer.cultural.dto.user.request.CreateUserDto
import com.m3sy.ktor.explorer.cultural.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/signup")
    fun signup(@Valid @RequestBody dto: CreateUserDto): ResponseEntity<AuthResponse> =
        ResponseEntity.ok(authService.signup(dto))

    @PostMapping("/login")
    fun login(@Valid @RequestBody dto: AuthRequest): ResponseEntity<AuthResponse> =
        ResponseEntity.ok(authService.login(dto))
}