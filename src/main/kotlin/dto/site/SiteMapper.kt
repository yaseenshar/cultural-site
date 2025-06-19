package com.m3sy.ktor.explorer.cultural.dto.site

import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.model.Site
import org.springframework.stereotype.Component

@Component
class SiteMapper() {

    fun toEntity(dtoSite : SiteDto): Site = Site(
        dataId = dtoSite.dataId,
        type = Site.TYPE.valueOf(dtoSite.type.uppercase()),
        properties = dtoSite.properties,
        geometry = dtoSite.geometry
    )

    fun toResponse(site : Site): SiteDto = SiteDto(
        id = site.id,
        dataId = site.dataId,
        type = site.type.name,
        properties = site.properties,
        geometry = site.geometry
    )
}