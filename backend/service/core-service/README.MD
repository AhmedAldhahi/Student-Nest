# Student Nest — Core Service Engine

**Architecture:** Domain-Driven Design (DDD) & Clean Architecture  
**Technology:** Node.js, TypeScript, Express, TypeORM, Redis, Apache Kafka  
**Academic Thesis:** Bachelor of Science in Software Engineering, Middle East University (MEU)  

---

## 1. Architectural Layers & Design Philosophy

The Core Service enforces strict Clean Architecture principles with inward-pointing dependencies:

```
src/
├── Domain/              # Pure business logic (Aggregates, Entities, Value Objects, Domain Events)
│   ├── BoundedContexts/
│   │   ├── Housing/             # Apartment entities, documents, geolocation
│   │   ├── IdentityAndAccess/   # Student/Landlord/User aggregates, OTP, credentials
│   │   ├── Leases/              # Lease agreements, lease request entities
│   │   ├── Notifications/       # System alerts, communication models
│   │   ├── Payment/             # Payment aggregates, receipt verification
│   │   ├── RommateProfile/      # Roommate matching aggregates & lifestyle habits
│   │   └── adminstration/       # Audit log entities & action definitions
│   └── Shared/                  # AggregateRoot base, DomainEventDispatcher, UnitOfWork contracts
├── Application/         # Orchestration & Use Cases (CQRS, Strategies, DTOs)
│   ├── BoundedContexts/         # Command/Query Handlers for each context
│   │   └── Shared/Strategy/     # Role-based strategy contexts (Payment, Lease, Profile, Apartment)
│   └── Interfaces/              # External service contracts (IMessageBroker, IEmail, IFileStorage)
├── Infrastructure/      # Technical mechanisms & external integrations
│   ├── Database/TypeOrm/        # Entity mappings, migrations, data-source
│   ├── Repositories/            # Split Read & Write TypeORM repository implementations
│   ├── Services/                # KafkaMessageBroker, RedisCache, Cloudinary, Bcrypt, TokenService
│   └── DIC/                     # Dependency Injection Containers
└── Presentation/        # HTTP API entry points
    └── http/
        ├── controllers/         # Express REST controllers
        ├── middlewares/         # RBAC, audit logger, granular rate limiters
        ├── routes/              # Modularized API routers (Admin, Landlord, Student, Shared)
        └── validation/          # Zod schema validation rules
```

---

## 2. Key Software Engineering Highlights

### 2.1 Domain-Driven Design (DDD)
- **Aggregate Roots:** Encapsulate domain rules (e.g. `StudentAggregateRoot`, `landloardAggregateRoot`, `apartmentEntity`, `RommateProfile`, `Payment.AgregateRoot`).
- **Value Objects:** Immutable objects with self-validation logic (e.g., `ApartmentPrice`, `OTP`, `StudentCard`, `UserGovId`, `RentTerm`, `AgeValue`).
- **Domain Events:** Emitted on state changes (`UserRegisterdEvent`, `LeaseEvent`) and dispatched via an in-memory event bus and Kafka broker.

### 2.2 Role-Based Strategy Pattern
Eliminates branching logic across role workflows by leveraging strategy classes:
- `PaymentContext` $\rightarrow$ `StudentPaymentStrategy` vs. `LandlordPaymentStrategy`
- `ApartmentContext` $\rightarrow$ `StudentApartment`, `LandlordApartment`, `AdminApartment`, `GuestApartment`
- `LeaseContext` & `LeaseRequestContext`
- `ProfileContext` & `NotificationContext`

### 2.3 Comprehensive Defense-in-Depth Security
- **Granular Per-Action Rate Limiters:** Dedicated sliding-window limits for OTP requests, login attempts, apartment submissions, and user edits.
- **Strict Role-Based Access Control (RBAC):** Middleware checks validating token claims against required role capabilities.
- **Audit Logging:** Every mutating HTTP request is recorded with timestamp, operator IP, action name, and payload summary.

---

## 3. Testing & Code Quality

### 3.1 Unit Test Suites
Automated unit tests covering Domain Aggregate Roots, Value Objects, and Enums:
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch
```

### 3.2 HTML Test & Security Reports
- **Unit Test Report:** [`test/backend/unit/AggregateRoot/test-report.html`](file:///c:/Users/Ahmed/Desktop/projects/Student-Nest/student/Student-Nest/backend/service/core-service/test/backend/unit/AggregateRoot/test-report.html)
- **Snyk Security Report:** [`test/backend/security/Snyk/snyk-report.html`](file:///c:/Users/Ahmed/Desktop/projects/Student-Nest/student/Student-Nest/backend/service/core-service/test/backend/security/Snyk/snyk-report.html)
- **NPM Audit Scan:** [`test/backend/security/audit/audit-report.json`](file:///c:/Users/Ahmed/Desktop/projects/Student-Nest/student/Student-Nest/backend/service/core-service/test/backend/security/audit/audit-report.json)

---

## 4. Local Execution

```bash
# 1. Install dependencies
npm install

# 2. Start Kafka & Kafka-UI via Docker
docker compose up -d

# 3. Start Core Service development server
npm run dev
```
The server will boot on `http://localhost:4000`.
