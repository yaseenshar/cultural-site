package com.m3sy.ktor.explorer.cultural.model

import jakarta.persistence.*
import jakarta.validation.constraints.Email
import java.time.Instant

@Entity
@Table(name = "user_")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userId: Long = 0,

    @Column(nullable = false)
    var lastName: String,

    var firstName: String,

    @Column(nullable = false, unique = true)
    var email: String,
    @Column(nullable = false)
    var password: String,
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    var status: Status = Status.ACTIVE,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_favourite_sites",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "site_id")]
    )
    var favourites: MutableSet<Site> = mutableSetOf(),

    @Column(nullable = false)
    val createdAt: Instant = Instant.now()
) {
    enum class Status { ACTIVE, INACTIVE }
}

