package com.m3sy.ktor.explorer.cultural.dto.site.request

data class SiteDto(
    val id: Long,
    val dataId: String,
    val type: String = "FEATURE",
    val properties: String,
    val geometry: String
)