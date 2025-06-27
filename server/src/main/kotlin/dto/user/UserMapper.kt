package com.m3sy.ktor.explorer.cultural.dto.user

import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.CreateUserDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.UserDto
import com.m3sy.ktor.explorer.cultural.model.Site
import com.m3sy.ktor.explorer.cultural.model.User
import org.springframework.stereotype.Component

@Component
class UserMapper {

    fun toEntity(dtoUser : CreateUserDto): User = User(
        lastName = dtoUser.lastName,
        firstName = dtoUser.firstName,
        email = dtoUser.email,
        password = dtoUser.password,
    )

    fun toResponse(user : User): UserDto = UserDto(
        userId = user.userId,
        lastName = user.lastName,
        firstName = user.firstName,
        email = user.email,
        password = user.password,
        status = user.status,
        role = user.role,
        createdAt = user.createdAt.toString()
    )
}