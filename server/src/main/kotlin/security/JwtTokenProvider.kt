package com.m3sy.ktor.explorer.cultural.security

import com.m3sy.ktor.explorer.cultural.config.JwtConfig
import io.jsonwebtoken.*
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Component
class JwtTokenProvider(private val config: JwtConfig) {

    private val key = SecretKeySpec(config.secret.toByteArray(), SignatureAlgorithm.HS256.jcaName)

    fun createToken(username: String, role: String): String {
        val token = Jwts.builder()
            .setSubject(username)
            .claim("role", role)
            .setIssuer(config.issuer)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + config.expirationMs))
            .signWith(SignatureAlgorithm.HS256, key)
            .compact()
        return token
    }

    fun createRefreshToken(username: String): String =
        Jwts.builder()
            .setSubject(username)
            .setIssuer(config.issuer)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + config.refreshExpirationMs))
            .signWith(SignatureAlgorithm.HS256, key)
            .compact()

    fun isExpired(token: String): Boolean =
        parseClaims(token).expiration.before(Date())

    fun parseClaims(token: String): Claims {
            return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body

    }

    fun validateTokenAndGetUsername(token: String): String {
        val claims = parseClaims(token)
        return claims.subject
    }
}