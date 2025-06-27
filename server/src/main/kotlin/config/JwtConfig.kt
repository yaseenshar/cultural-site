package com.m3sy.ktor.explorer.cultural.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "jwt")
class JwtConfig {
    lateinit var secret: String
    lateinit var issuer: String
    var expirationMs: Long = 0
    var refreshExpirationMs: Long = 0
}
