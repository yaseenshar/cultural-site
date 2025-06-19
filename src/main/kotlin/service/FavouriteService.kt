package com.m3sy.ktor.explorer.cultural.service

import com.m3sy.ktor.explorer.cultural.dto.site.SiteMapper
import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.repository.SiteRepository
import com.m3sy.ktor.explorer.cultural.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class FavouriteService (
    private val userRepository: UserRepository,
    private val siteRepository: SiteRepository,
    private val mapper: SiteMapper
) {

    fun addFavouriteSite(userId: Long, siteId: Long) {
        val user = userRepository.findById(userId).orElseThrow { RuntimeException("User not found") }
        val site = siteRepository.findById(siteId).orElseThrow { RuntimeException("Site not found") }
        user.favourites.add(site)
        userRepository.save(user)
    }

    fun removeFavouriteSite(userId: Long, siteId: Long) {
        val user = userRepository.findById(userId).orElseThrow { RuntimeException("User not found") }
        val site = siteRepository.findById(siteId).orElseThrow { RuntimeException("Site not found") }
        user.favourites.remove(site)
        userRepository.save(user)
    }

    fun getFavouriteSites(userId: Long): List<SiteDto> {
        val user = userRepository.findById(userId).orElseThrow { RuntimeException("User not found") }
        return user.favourites.map { mapper.toResponse(it) }
    }
}