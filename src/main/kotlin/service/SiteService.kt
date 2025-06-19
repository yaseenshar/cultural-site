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

    fun getAll(): List<Site> = siteRepository.findAll()

    fun  getById(id: Long): Site = siteRepository.findById(id)
        .orElseThrow { RuntimeException("Site not found") }

    fun getByType(type: Site.TYPE): List<Site> = siteRepository.findAllByType(type)

    fun save(siteDto: SiteDto) {
        val entity = mapper.toEntity(siteDto)
        siteRepository.save(entity)
    }

    fun saveAll(siteDtos: List<SiteDto>) {
        val entities = siteDtos.map { mapper.toEntity(it) }
        siteRepository.saveAll(entities)
    }
}