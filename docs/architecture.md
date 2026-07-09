# Cultural Site Explorer - High-Level Architecture

```mermaid
flowchart LR
    U[Web / Mobile Browser] -->|HTTPS| FE[Angular Client]

    subgraph Frontend
      FE --> INT[Auth Interceptor]
      FE --> G1[Auth Guard]
      FE --> G2[Admin Guard]
      FE --> MAP[Google Maps UI]
    end

    INT -->|****** API[Spring Boot API]

    subgraph Backend
      API --> AUTH[AuthController + AuthService]
      API --> USER[UserController + UserService]
      API --> SITE[SiteController + SiteService]
      API --> FAV[UserFavouritesController + FavouriteService]
      API --> SEC[JwtFilter + SecurityConfig]
      AUTH --> JWT[JwtTokenProvider]
      SITE --> MAPPER[SiteMapper]
    end

    USER --> REPOU[UserRepository]
    SITE --> REPOS[SiteRepository]
    FAV --> REPOU
    FAV --> REPOS
    AUTH --> REPOU

    REPOU --> DB[(PostgreSQL)]
    REPOS --> DB

    FE -. refresh token .-> AUTH
    SITE -. category grouping/filtering .-> FE
    FAV -. favorites state .-> FE
```

## Component Relationships
- The Angular client sends all API traffic through an HTTP interceptor that injects JWT access tokens.
- Spring Security validates JWT on protected routes and exposes `/auth/**` publicly.
- Controllers delegate to services, which call repositories for PostgreSQL persistence.
- Site payloads are normalized by `SiteMapper` between DTOs and entity JSON fields.
- Favorites are modeled as a user-to-site relationship in the backend data model.
