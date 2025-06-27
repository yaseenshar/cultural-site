package com.m3sy.ktor.explorer.cultural.controller

import com.m3sy.ktor.explorer.cultural.dto.auth.response.AuthResponse
import com.m3sy.ktor.explorer.cultural.dto.site.request.CategoryType
import com.m3sy.ktor.explorer.cultural.dto.site.request.FeatureCollectionDto
import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.dto.user.request.CreateUserDto
import com.m3sy.ktor.explorer.cultural.model.Site
import com.m3sy.ktor.explorer.cultural.service.SiteService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/sites")
class SiteController (private val siteService: SiteService) {

    @GetMapping
    fun getAll(): ResponseEntity<List<SiteDto>> {
        return ResponseEntity.ok(siteService.getAll())
    }

    @GetMapping("/grouped")
    fun getGroupedSites(): ResponseEntity<Map<CategoryType, List<SiteDto>>> {
        val grouped = siteService.getAll()
            .groupBy { it.category }
        return ResponseEntity.ok(grouped)
    }

    @GetMapping("/filter")
    fun filterByCategory(@RequestParam category: CategoryType): ResponseEntity<List<SiteDto>> {
        return ResponseEntity.ok(siteService.getAll().filter { it.category == category })
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<SiteDto> {
        return ResponseEntity.ok(siteService.getById(id))
    }

    @GetMapping("/type/{type}")
    fun getByStatus(@PathVariable type: Site.TYPE): ResponseEntity<List<SiteDto>> {
        return ResponseEntity.ok(siteService.getByType(type))
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    fun uploadSingleSite(@RequestBody site: SiteDto): ResponseEntity<String> {
        siteService.save(site)
        return ResponseEntity.ok("Single site saved")
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    fun uploadSites(@RequestBody sites: List<SiteDto>): ResponseEntity<String> {
        siteService.saveAll(sites)
        return ResponseEntity.ok("Sites uploaded")
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/collection")
    fun uploadFeatureCollection(@RequestBody fc: FeatureCollectionDto): ResponseEntity<String> {
        siteService.saveAll(fc.features)
        return ResponseEntity.ok("Feature collection saved")
    }
}