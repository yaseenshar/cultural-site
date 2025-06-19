package com.m3sy.ktor.explorer.cultural.security

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

class JwtFilter(private val jwtTokenProvider: JwtTokenProvider) : OncePerRequestFilter() {
    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        val token = resolveToken(req)
        if (token != null) {
            val username = jwtTokenProvider.validateToken(token)
            val auth = UsernamePasswordAuthenticationToken(username, null, emptyList())
            auth.details = WebAuthenticationDetailsSource().buildDetails(req)
            SecurityContextHolder.getContext().authentication = auth
        }
        chain.doFilter(req, res)
    }

    private fun resolveToken(req: HttpServletRequest): String? {
        val bearer = req.getHeader("Authorization") ?: return null
        return if (StringUtils.hasText(bearer) && bearer.startsWith("Bearer ")) bearer.substring(7) else null
    }
}