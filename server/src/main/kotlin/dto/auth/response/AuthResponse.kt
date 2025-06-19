package com.m3sy.ktor.explorer.cultural.dto.auth.response

import com.m3sy.ktor.explorer.cultural.dto.user.request.UserDto

data class AuthResponse(val accessToken: String, val refreshToken: String, val user: UserDto)