package com.m3sy.ktor.explorer.cultural.repository

import com.m3sy.ktor.explorer.cultural.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
    fun findAllByStatus(status: User.Status): List<User>
}