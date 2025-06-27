package com.m3sy.ktor.explorer.cultural.dto.user.request

import com.m3sy.ktor.explorer.cultural.model.User
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class UserDto(
    val userId: Long = 0,
    val lastName: String,
    val firstName: String,
    val email: String,
    val password: String,
    var status: User.Status,
    val role: User.Role,
    val createdAt: String
)