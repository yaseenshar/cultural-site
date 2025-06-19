package com.m3sy.ktor.explorer.cultural.repository

import com.m3sy.ktor.explorer.cultural.model.Site
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SiteRepository : JpaRepository<Site, Long>  {

    fun findAllByType(status: Site.TYPE): List<Site>
}