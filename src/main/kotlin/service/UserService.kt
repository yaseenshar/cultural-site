package com.m3sy.ktor.explorer.cultural.service

import com.m3sy.ktor.explorer.cultural.dto.user.UserMapper
import com.m3sy.ktor.explorer.cultural.dto.user.request.UpdateUserDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.UserDto
import com.m3sy.ktor.explorer.cultural.model.User
import com.m3sy.ktor.explorer.cultural.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) {

    fun getAll(): List<UserDto> = userRepository.findAll().map {
        userMapper.toResponse(it)
    }

    fun getById(id: Long): UserDto = userRepository.findById(id)
        .map {
            userMapper.toResponse(it)
        }.orElseThrow { RuntimeException("User not found") }

    fun getByStatus(status: User.Status): List<UserDto> =
        userRepository.findAllByStatus(status).map {
            userMapper.toResponse(it)
        }

    fun update(id: Long, dto: UpdateUserDto): UserDto {

        val user = userRepository.findById(id).orElseThrow { RuntimeException("User not found") }

        dto.lastName?.let { user.lastName = it }
        dto.firstName?.let { user.firstName = it }
        dto.status?.let { user.status = it }

        val updated = userRepository.save(user)

        return userMapper.toResponse(updated)
    }
}
