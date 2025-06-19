package com.m3sy.ktor.explorer.cultural.dto.site.response

import com.m3sy.ktor.explorer.cultural.dto.site.request.GeometryDto

data class SiteResponseDto(
    val id: Long,
    val dataId: String,
    val type: String,
    val properties: Map<String, String>,
    val geometry: GeometryDto
)
