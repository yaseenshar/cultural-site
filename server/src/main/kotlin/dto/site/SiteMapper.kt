package com.m3sy.ktor.explorer.cultural.dto.site

import com.fasterxml.jackson.core.type.TypeReference
import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.model.Site
import org.springframework.stereotype.Component
import com.fasterxml.jackson.databind.ObjectMapper
import com.m3sy.ktor.explorer.cultural.dto.site.request.CategoryType

@Component
class SiteMapper(private val mapper: ObjectMapper) {

    fun toEntity(dtoSite : SiteDto): Site = Site(
        dataId = dtoSite.id,
        type = Site.TYPE.valueOf(dtoSite.type.uppercase()),
        properties = mapper.writeValueAsString(dtoSite.properties),
        geometry = mapper.writeValueAsString(dtoSite.geometry)
    )

    fun toResponse(site : Site): SiteDto {
        val props = mapper.readValue(site.properties, object : TypeReference<Map<String, Any>>() {})
        val geom = mapper.readValue(site.geometry, object : TypeReference<Map<String, Any>>() {})

        return SiteDto(
            siteId = site.id,
            id = site.dataId,
            type = site.type.name,
            category = resolveCategory(props),
            properties = props,
            geometry = geom
        )
    }

    private fun resolveCategory(props: Map<String, Any>): CategoryType {
        return when {
            props["amenity"] == "restaurant" -> CategoryType.RESTAURANT
            props["amenity"] == "theatre" -> CategoryType.THEATRE
            props["tourism"] == "museum" -> CategoryType.MUSEUM
            props["tourism"] in listOf("artwork", "gallery") ||
                    props["art_gallery"] == "yes" -> CategoryType.ARTWORK
            else -> CategoryType.OTHER
        }
    }
}