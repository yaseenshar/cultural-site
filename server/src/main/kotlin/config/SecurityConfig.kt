package com.m3sy.ktor.explorer.cultural.config


import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import com.m3sy.ktor.explorer.cultural.security.JwtTokenProvider
import com.m3sy.ktor.explorer.cultural.security.JwtFilter

import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.security.config.annotation.web.invoke

@Configuration
@EnableMethodSecurity
class SecurityConfig(private val jwtProvider: JwtTokenProvider) {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {

        http {
            cors { }
            csrf { disable() }
            sessionManagement {
                sessionCreationPolicy = SessionCreationPolicy.STATELESS
            }
            authorizeHttpRequests {
                authorize(AntPathRequestMatcher("/auth/**"), permitAll)
                authorize(AntPathRequestMatcher("/v3/api-docs/**"), permitAll)
                authorize(AntPathRequestMatcher("/swagger-ui/**"), permitAll)
                authorize(AntPathRequestMatcher("/swagger-ui.html"), permitAll)
                authorize(anyRequest, authenticated)
            }
            addFilterBefore(JwtFilter(jwtProvider), UsernamePasswordAuthenticationFilter::class.java)
        }
        return http.build()
    }
}