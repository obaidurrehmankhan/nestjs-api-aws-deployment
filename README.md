# 🚀 NestJS Boilerplate Hub

Production-minded **NestJS boilerplate** you can clone to kickstart real projects. It ships with **clean module boundaries, DTO validation, Swagger, SQL with relations, JWT auth (+ Google sign-in path), refresh tokens, mailer, file uploads (S3-ready), transactions, pagination, interceptors/serialization, exception handling, unit & e2e tests**, and a sane developer experience.

<p align="left">
  <a href="#-tech-stack"><img alt="NestJS" src="https://img.shields.io/badge/Backend-NestJS-blue"></a>
  <a href="#-tech-stack"><img alt="TypeORM" src="https://img.shields.io/badge/ORM-TypeORM-informational"></a>
  <a href="#-api-docs--code-docs"><img alt="Docs" src="https://img.shields.io/badge/Docs-Swagger%20%7C%20Compodoc-purple"></a>
  <a href="#-topics-covered"><img alt="Scope" src="https://img.shields.io/badge/Scope-Production%20Blueprint-success"></a>
</p>

---


## 🧱 Tech Stack

| Layer               | Tech                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Backend             | **NestJS** (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)                                              |
| Data                | **TypeORM** (`@nestjs/typeorm`, `typeorm`) + **PostgreSQL** (`pg`)                                                     |
| Auth                | **JWT** (`@nestjs/jwt`), **bcrypt**, guards & custom decorators; **Google OAuth (optional)** via `google-auth-library` |
| Validation & Config | **class-validator**, **class-transformer**, **@nestjs/config** + **joi** (env schema)                                  |
| Docs                | **Swagger** at `/docs` (`@nestjs/swagger`, `swagger-ui-express`), **Compodoc** (`npm run doc`)                         |
| Mail                | **@nestjs-modules/mailer**, **nodemailer**, **EJS** templates                                                          |
| Testing             | **Jest**, **@nestjs/testing**, **Supertest**, **ts-jest**, **@faker-js/faker**                                         |
| DX / Build          | **TypeScript**, **ESLint** + `typescript-eslint`, **Prettier**, **ts-node**, **tsconfig-paths**                        |

---


## ✅ Topics Covered

* **Understanding Modules** — app structure, feature modules, clean imports/exports
* **Validation & Pipes** — DTO validation with `class-validator`, transformation with `ValidationPipe`
* **DTO-based Requests/Responses** — request/response shapes via DTO classes

  * *Note:* DTOs are **not** pipes; they work **with** pipes (e.g., `ValidationPipe`) to validate/transform data
* **Dependency Injection (DI)** — providers/services, tokens, scopes, module wiring
* **API Documentation** — **Swagger (OpenAPI)** & **Compodoc** code docs
* **SQL & Complex Relations** — one-to-one, one-to-many, many-to-many
* **Environment Configuration** — `test`, `dev`, `prod` via `@nestjs/config` (+ `joi` schemas)
* **Transactions** — TypeORM `QueryRunner` patterns for multi-step writes
* **Exception Handling** — global filters + consistent error shape
* **Custom Pagination** — page/limit, totals, metadata, link building
* **User Authentication (JWT)** — access tokens, hashing, protected routes
* **Google OAuth** — social sign-in (token verification → user upsert) *(optional)*
* **Refresh Tokens** — rotation + revocation strategy
* **Guards & Decorators** — auth/role guards, `@ActiveUser()`, `@Roles()`
* **Serialization & Interceptors** — `ClassSerializerInterceptor`, logging/timeout/transform
* **Notification Emails** — mailer + EJS templates (verify/reset)
* **File Uploading** — AWS S3-ready design with cloudfront (signed URLs / CDN friendly)
* **Unit & End-to-End Testing** — Jest, `@nestjs/testing`, Supertest, coverage
* **Basic Deployment** — build artifacts, env vars, PM2/start scripts, Swagger hardening

---

## ⚙️ Quickstart

```bash
# 1) Install
npm i

# 2) Configure environment
cp .env.example .env

# 3) Start database (ensure Postgres is available) and run migrations
# (Adjust to your setup; you can also use a local Postgres instance)
npm run build
# if you keep CLI/migration script, run it here (e.g., npm run typeorm:migrate)

# 4) Run
npm run start:dev
# Swagger available at http://localhost:3000/docs
```

### `.env.example` (edit and copy to `.env`)

```bash
# App
APP_PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database (pick one style)
DATABASE_URL=postgres://user:password@localhost:5432/app_db
# or
PGHOST=localhost
PGPORT=5432
PGUSER=user
PGPASSWORD=password
PGDATABASE=app_db

# JWT
JWT_SECRET=change_me
JWT_EXPIRES_IN=15m
REFRESH_SECRET=change_me_too
REFRESH_EXPIRES_IN=7d

# Mail
MAIL_HOST=localhost
MAIL_PORT=2525
MAIL_USER=user
MAIL_PASSWORD=password
MAIL_FROM='"App" <no-reply@example.com>'

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# AWS (optional, for uploads)
AWS_REGION=
AWS_S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

---

## 🔐 Auth Overview

* **Register/Login** → issue **access** + **refresh** tokens
* **Access token** in `Authorization: Bearer <token>`
* **Refresh flow** → rotate refresh tokens, revoke on logout, device-aware if needed
* **Guards**: `AuthGuard` + role-based guard
* **Decorators**: `@ActiveUser()` for `sub`, `@Roles()` for authorization
* **/auth/me** → returns current user profile with serialization

---

## 📚 API Docs & Code Docs

* **Swagger**: auto-generated docs at **`/docs`** (Bearer auth enabled)
* **Compodoc**: run `npm run doc` to explore modules, providers, and relationships

---

## 🧪 Testing

```bash
# Unit tests
npm test
npm run test:watch
npm run test:cov

# E2E tests
npm run test:e2e
```

* Uses **Jest** + **@nestjs/testing** for unit tests, **Supertest** for e2e.
* Seed/teardown helpers ensure DB isolation for e2e.

---

## 🧰 Dev UX

* **Formatting & Lint**: `npm run format`, `npm run lint`
* **Scripts**: `start`, `start:dev`, `start:debug`, `start:prod`, `build`
* **Docs**: `npm run doc` for Compodoc
* **Aliases**: `tsconfig-paths` for clean imports

---

## 🚢 Deployment (basic)

* Build: `npm run build` → run `node dist/main.js`
* Process manager: **PM2** (add an ecosystem file if you prefer)
* Secure **env** injection (no secrets in code), strict CORS, and lock down Swagger in prod

---

## 🧭 Design Decisions & Conventions

* **DTO-first** API with strict validation.
* **Global pipes/filters/interceptors** for consistent behavior.
* **Service-driven** business logic (thin controllers).
* **Repository/QueryBuilder** for complex reads & pagination.
* **Transaction boundaries** explicit with `QueryRunner`.
* **Serialization** via `ClassSerializerInterceptor` (hide sensitive fields).

---

## 🤝 Contributing / Contact

PRs and issues welcome.
**[obaid.techguy@gmail.com](mailto:obaid.techguy@gmail.com)**
