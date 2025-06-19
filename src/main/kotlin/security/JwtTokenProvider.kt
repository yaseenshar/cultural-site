package com.m3sy.ktor.explorer.cultural.security

import com.m3sy.ktor.explorer.cultural.config.JwtConfig
import io.jsonwebtoken.*
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Component
class JwtTokenProvider(private val config: JwtConfig) {

    private val key = SecretKeySpec(config.secret.toByteArray(), SignatureAlgorithm.HS256.jcaName)

    fun createToken(username: String): String {
        val token = Jwts.builder()
            .setSubject(username)
            .setIssuer(config.issuer)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + config.expirationMs))
            .signWith(SignatureAlgorithm.HS256, key)
            .compact()
        return token
    }


    fun validateToken(token: String): String {
        try {
            val body = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).body
            return body.subject
        } catch (e: JwtException) {
            throw RuntimeException("Invalid JWT token")
        }
    }
}