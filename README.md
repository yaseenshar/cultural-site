# client

# 🏛️ Cultural Sites Explorer (Angular 18+)

An Angular 18+ standalone web application built to explore, view, and manage cultural sites for a city — featuring JWT authentication, map integration, and clean Tailwind-styled UI.

![screenshot](public/screenshots/landing.png)

---

## 🚀 Features

- ✅ User Registration, Login & Logout
- ✅ JWT + Refresh Token Authentication
- ✅ Protected Routes with Route Guards
- ✅ Dynamic Navbar (reactive to login)
- ✅ User Profile View & Edit
- ✅ Cultural Sites Listing
- ✅ Interactive Google Maps Integration
- ✅ Favorite Sites Tracking
- ✅ Filtering by category
- ✅ Responsive Design (Tailwind CSS)

---

## 🧰 Tech Stack

- **Angular 18** (Standalone Components)
- **RxJS** for reactive flows
- **Tailwind CSS v3+**
- **Google Maps API**
- **Popper.js** for dynamic menus
- **@angular/google-maps** (optional)
- **JWT** with refresh strategy
- **Custom API backend** (localhost:8080)

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cultural-site-explorer.git
cd cultural-site-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run start
```

Frontend will run at:
👉 http://localhost:4200/

## 📦 Folder Structure (Key Parts)

```
src/
├── app/
│   ├── core/               # Services, interceptors, guards
│   ├── features/           # Feature modules (auth, profile, sites)
│   ├── shared/             # Reusable components (navbar, footer, popovers)
│   ├── data/               # Interfaces, models
│   ├── app.config.ts       # Standalone app setup
│   └── main.ts             # Entry point
├── public/                 # Static assets if using public folder
└── styles.scss             # TailwindCSS entry
```

## 🔐 API Configuration
Make sure your backend (e.g. Spring Boot, ktor) is running at:

http://localhost:8080/

Enable CORS for Angular frontend at http://localhost:4200.


💡 Useful Scripts

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run start` | Starts dev server          |
| `npm run build` | Builds production output   |
| `npm run lint`  | Lints codebase with ESLint |


📷 Screenshots
Add your own screenshots to public/screenshots/ and reference them here:

- Home Page
- Profile Page
- Map View

# server

This project was created using the [Ktor Project Generator](https://start.ktor.io).

Here are some useful links to get you started:

- [Ktor Documentation](https://ktor.io/docs/home.html)
- [Ktor GitHub page](https://github.com/ktorio/ktor)
- The [Ktor Slack chat](https://app.slack.com/client/T09229ZC6/C0A974TJ9). You'll need
  to [request an invite](https://surveys.jetbrains.com/s3/kotlin-slack-sign-up) to join.

## Features

Here's a list of features included in this project:

| Name                                                                   | Description                                                                        |
|------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [Routing](https://start.ktor.io/p/routing)                             | Provides a structured routing DSL                                                  |
| [Content Negotiation](https://start.ktor.io/p/content-negotiation)     | Provides automatic content conversion according to Content-Type and Accept headers |
| [kotlinx.serialization](https://start.ktor.io/p/kotlinx-serialization) | Handles JSON serialization using kotlinx.serialization library                     |

## Building & Running

To build or run the project, use one of the following tasks:

| Task                          | Description                                                          |
|-------------------------------|----------------------------------------------------------------------|
| `./gradlew test`              | Run the tests                                                        |
| `./gradlew build`             | Build everything                                                     |
| `buildFatJar`                 | Build an executable JAR of the server with all dependencies included |
| `buildImage`                  | Build the docker image to use with the fat JAR                       |
| `publishImageToLocalRegistry` | Publish the docker image locally                                     |
| `run`                         | Run the server                                                       |
| `runDocker`                   | Run using the local docker image                                     |

If the server starts successfully, you'll see the following output:

```
2024-12-04 14:32:45.584 [main] INFO  Application - Application started in 0.303 seconds.
2024-12-04 14:32:45.682 [main] INFO  Application - Responding at http://0.0.0.0:8080
```

---




📄 License
MIT License.
Feel free to fork and contribute!