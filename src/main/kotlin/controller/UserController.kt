package com.m3sy.ktor.explorer.cultural.controller

import com.m3sy.ktor.explorer.cultural.dto.user.request.UpdateUserDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.UserDto
import com.m3sy.ktor.explorer.cultural.model.User
import com.m3sy.ktor.explorer.cultural.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getAll(): List<UserDto> = userService.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): UserDto = userService.getById(id)

    @GetMapping("/status/{status}")
    fun getByStatus(@PathVariable status: User.Status): List<UserDto> =
        userService.getByStatus(status)

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: Long, @RequestBody dto: UpdateUserDto): ResponseEntity<UserDto> =
        ResponseEntity.ok(userService.update(id, dto))
}