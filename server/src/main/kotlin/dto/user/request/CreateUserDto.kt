package com.m3sy.ktor.explorer.cultural.dto.user.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class CreateUserDto(
    @field:NotBlank(message = "Last Name must not be empty.") val lastName: String,
    val firstName: String,
    @field:NotBlank @field:Email val email: String,
    @field:NotBlank(message = "Password must not be empty.") @field:Size(min = 6, message = "Minimum length is 6 for password")
    val password: String
)