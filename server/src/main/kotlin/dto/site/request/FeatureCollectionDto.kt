package com.m3sy.ktor.explorer.cultural.dto.site.request

data class FeatureCollectionDto(
    val type: String,
    val features: List<SiteDto>
)