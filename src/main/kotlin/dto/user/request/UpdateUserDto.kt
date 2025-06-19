package com.m3sy.ktor.explorer.cultural.dto.user.request

import com.m3sy.ktor.explorer.cultural.model.User
import jakarta.validation.constraints.NotBlank

data class UpdateUserDto(
    @field:NotBlank val lastName: String?,
    val firstName: String?,
    val status: User.Status?
)