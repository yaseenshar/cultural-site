package com.m3sy.ktor.explorer.cultural.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.io.Serializable

@Entity
@Table(name = "site_")
data class Site(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val dataId: String,

    @Enumerated(EnumType.STRING)
    var type: TYPE = TYPE.FEATURE,

    @Column(columnDefinition = "TEXT", nullable = false)
    var properties: String,  // Stored as raw JSON string

    @Column(columnDefinition = "TEXT", nullable = false)
    var geometry: String     // Stored as raw JSON string
) : Serializable {
    enum class TYPE { FEATURE }
}