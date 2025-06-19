val kotlinVersion: String by project
val logbackVersion: String by project
val exposedVersion: String by project
val postgresqlDriverVersion: String by project
val hikariCpVersion: String by project
val ktorVersion: String by project

plugins {
    kotlin("jvm") version "1.9.10"
    kotlin("plugin.spring") version "1.9.10"
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.3"
    id("org.jetbrains.kotlin.plugin.noarg") version "1.9.10"
}

group = "com.m3sy.ktor.explorer.cultural"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

noArg {
    annotation("jakarta.persistence.Entity")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")


    implementation("org.springframework.security:spring-security-config")
    implementation("org.springframework.security:spring-security-web")
    implementation("org.springframework.security:spring-security-core")

    implementation("com.vladmihalcea:hibernate-types-60:2.21.1")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")

    //optional if still ide show error
    //implementation("org.springframework.security:spring-security-oauth2-jose")


    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0") // JPA, replaces javax.persistence :contentReference[oaicite:2]{index=2}
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}