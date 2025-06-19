package com.m3sy.ktor.explorer.cultural.dto.auth.request

import jakarta.validation.constraints.NotBlank

data class AuthRequest(
    @field:NotBlank val email: String,
    @field:NotBlank val password: String
)