package com.m3sy.ktor.explorer.cultural.service

import com.m3sy.ktor.explorer.cultural.dto.site.SiteMapper
import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.model.Site
import com.m3sy.ktor.explorer.cultural.repository.SiteRepository
import org.springframework.stereotype.Service

@Service
class SiteService(
    private val siteRepository: SiteRepository,
    private val mapper: SiteMapper
) {

    fun getAll(): List<SiteDto> {
        return siteRepository.findAll().map { mapper.toResponse(it) }
    }

    fun getById(id: Long): SiteDto {
        return siteRepository.findById(id)
            .map { mapper.toResponse(it) }
            .orElseThrow { RuntimeException("Site not found") }
    }

    fun getByType(type: Site.TYPE): List<SiteDto> {
        return siteRepository.findAllByType(type).map { mapper.toResponse(it) }
    }

    fun save(siteDto: SiteDto) {
        val entity = mapper.toEntity(siteDto)
        siteRepository.save(entity)
    }

    fun saveAll(siteDtos: List<SiteDto>) {
        val entities = siteDtos.map { mapper.toEntity(it) }
        siteRepository.saveAll(entities)
    }
}