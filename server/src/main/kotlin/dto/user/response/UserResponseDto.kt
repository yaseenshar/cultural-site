package com.m3sy.ktor.explorer.cultural.dto.user.response

import com.m3sy.ktor.explorer.cultural.model.User

data class UserResponseDto(
    val id: Long,
    val lastName: String,
    val firstName: String,
    val email: String,
    var status: User.Status,
    val createdAt: String
)
