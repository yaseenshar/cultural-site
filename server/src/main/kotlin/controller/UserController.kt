package com.m3sy.ktor.explorer.cultural.controller

import com.m3sy.ktor.explorer.cultural.dto.user.request.UpdateUserDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.UserDto
import com.m3sy.ktor.explorer.cultural.model.User
import com.m3sy.ktor.explorer.cultural.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {

    @PreAuthorize("hasRole('ADMIN')")
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

    @PutMapping("/{id}/deactivate")
    fun deactivateUser(@PathVariable id: Long): ResponseEntity<String> {
        userService.deactivateUser(id)
        return ResponseEntity.ok("User status set to INACTIVE")
    }

}