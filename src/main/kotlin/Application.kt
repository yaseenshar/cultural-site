package com.m3sy.ktor.explorer.cultural

import com.m3sy.ktor.explorer.cultural.config.JwtConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(JwtConfig::class)
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}