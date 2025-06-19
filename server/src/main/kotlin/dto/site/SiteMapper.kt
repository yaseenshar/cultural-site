package com.m3sy.ktor.explorer.cultural.dto.site

import com.fasterxml.jackson.core.type.TypeReference
import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.model.Site
import org.springframework.stereotype.Component
import com.fasterxml.jackson.databind.ObjectMapper

@Component
class SiteMapper(private val mapper: ObjectMapper) {

    fun toEntity(dtoSite : SiteDto): Site = Site(
        dataId = dtoSite.id,
        type = Site.TYPE.valueOf(dtoSite.type.uppercase()),
        properties = mapper.writeValueAsString(dtoSite.properties),
        geometry = mapper.writeValueAsString(dtoSite.geometry)
    )

    fun toResponse(site : Site): SiteDto = SiteDto(
        siteId = site.id,
        id = site.dataId,
        type = site.type.name,
        properties = mapper.readValue(site.properties, object : TypeReference<Map<String, Any>>() {}),
        geometry = mapper.readValue(site.geometry, object : TypeReference<Map<String, Any>>() {})
    )
}