package com.m3sy.ktor.explorer.cultural.security

import io.jsonwebtoken.JwtException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.authority.SimpleGrantedAuthority

class JwtFilter(private val jwtTokenProvider: JwtTokenProvider) : OncePerRequestFilter() {
    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        val token = resolveToken(req)
        if (token != null) {
            try {

                val claims = jwtTokenProvider.parseClaims(token)
                val username = claims.subject
                val role = claims["role"] as String
                val authorities = listOf(SimpleGrantedAuthority("ROLE_$role"))

                val auth = UsernamePasswordAuthenticationToken(username, null, authorities)
                auth.details = WebAuthenticationDetailsSource().buildDetails(req)
                SecurityContextHolder.getContext().authentication = auth

            } catch (e: JwtException) {
                res.status = HttpServletResponse.SC_UNAUTHORIZED
                res.contentType = "application/json"
                res.writer.write("""{ "error": "Invalid or expired JWT token" }""")
                res.writer.flush()
                return
            }
        }

        chain.doFilter(req, res)

    }

    private fun resolveToken(req: HttpServletRequest): String? {
        val bearer = req.getHeader("Authorization") ?: return null
        return if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) bearer.substring(7) else null
    }
}