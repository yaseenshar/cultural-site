package com.m3sy.ktor.explorer.cultural.dto.site.request

data class SiteDto(
    val siteId: Long,
    val id: String,
    val type: String = "FEATURE",
    val properties: Map<String, Any>,
    val geometry: Map<String, Any>
)