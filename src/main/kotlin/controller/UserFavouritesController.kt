package com.m3sy.ktor.explorer.cultural.controller

import com.m3sy.ktor.explorer.cultural.dto.site.request.SiteDto
import com.m3sy.ktor.explorer.cultural.service.FavouriteService
import com.m3sy.ktor.explorer.cultural.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users/{userId}/favourites")
class UserFavouritesController(private val favouriteService: FavouriteService) {

    @PostMapping("/{siteId}")
    fun addFavourite(@PathVariable userId: Long, @PathVariable siteId: Long): ResponseEntity<String> {
        favouriteService.addFavouriteSite(userId, siteId)
        return ResponseEntity.ok("Site added to favourites")
    }

    @DeleteMapping("/{siteId}")
    fun removeFavourite(@PathVariable userId: Long, @PathVariable siteId: Long): ResponseEntity<String> {
        favouriteService.removeFavouriteSite(userId, siteId)
        return ResponseEntity.ok("Site removed from favourites")
    }

    @GetMapping
    fun listFavourites(@PathVariable userId: Long): ResponseEntity<List<SiteDto>> {
        return ResponseEntity.ok(favouriteService.getFavouriteSites(userId))
    }
}
