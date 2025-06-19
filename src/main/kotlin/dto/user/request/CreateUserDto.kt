package com.m3sy.ktor.explorer.cultural.dto.user.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class CreateUserDto(
    @field:NotBlank val lastName: String,
    val firstName: String,
    @field:NotBlank @field:Email val email: String,
    @field:NotBlank @field:Size(min = 6) val password: String
)