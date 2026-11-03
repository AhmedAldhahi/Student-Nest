# Student Nest: Software Architecture Document (SAD)

**Project:** Student Nest (Bachelor of Science in Software Engineering Thesis)  
**Institution:** Middle East University (MEU) — Faculty of Information Technology  
**Department:** Software Engineering  

---

## 1. System Overview & Problem Statement

### 1.1 Problem Statement
The student housing market suffers from several critical challenges:
1. **Information Asymmetry & Rental Fraud:** Unverified landlord listings, misleading apartment photos, and fake deposit requests.
2. **Roommate Incompatibility:** Friction caused by conflicting lifestyle habits (sleep cycles, guest habits, smoking, noise tolerance, study environments).
3. **Lease Insecurity & Disputes:** Informal, paper-based, or easily falsifiable tenancy contracts without transparent audit trails.
4. **Student Identity Verification:** Lack of academic validation, leading to security concerns in student-only communities.

### 1.2 The Student Nest Solution
Student Nest is an enterprise-grade, decentralized housing platform designed specifically for university ecosystems. It provides:
- **Academic Verification:** University email and student ID validation.
- **Landlord KYC:** Government ID and apartment title verification.
- **Algorithmic Roommate Matching:** Mathematical compatibility scoring across lifestyle vectors.
- **Event-Driven Architecture:** Apache Kafka integration for decoupled asynchronous processing.
- **Blockchain Contract Immutability:** Tamper-proof tenancy contract storage and dispute settlement auditing.

---

## 2. High-Level System Architecture

```mermaid
graph TB
    subgraph Clients ["Client Applications Layer"]
        Mobile["📱 Mobile App (React Native / Expo 54)<br/>Students & Landlords"]
        Web["💻 Web Portal (React 19 / Vite / MUI)<br/>Administrators & Landlords"]
    end

    subgraph Gateway ["Edge & Security Layer"]
        CORS["CORS & Helmet"]
        Audit["Audit Logging Middleware"]
        AuthMid["JWT & RBAC Middleware"]
        RateLimit["Per-Action Rate Limiters"]
    end

    subgraph CoreBackend ["Core Service (Express / TypeScript / Clean Arch)"]
        CQRS["CQRS Application Layer"]
        DomainLayer["DDD Domain Models & Aggregates"]
        TypeORM["TypeORM Persistence Engine"]
        Cache["Redis Cache Manager"]
    end

    subgraph Messaging ["Event Streaming Layer"]
        KafkaBroker["Apache Kafka 3.7.0 Broker"]
        KafkaUI["Kafka UI Console (:8080)"]
    end

    subgraph BlockchainMicroservice ["Blockchain Service (NestJS Microservice)"]
        KafkaConsumer["Kafka Consumer Engine"]
        SmartContract["Smart Contract / Immutable Ledger"]
    end

    subgraph ExternalServices ["External Infrastructure"]
        MySQL[(MySQL Relational Database)]
        Redis[(Redis Cache)]
        Cloudinary[Cloudinary CDN Media Storage]
        Mailtrap[Email Dispatcher (SendGrid / Mailtrap)]
    end

    Mobile --> CORS
    Web --> CORS
    CORS --> Audit --> AuthMid --> RateLimit --> CQRS
    CQRS --> DomainLayer
    DomainLayer --> TypeORM
    DomainLayer --> Cache
    TypeORM --> MySQL
    Cache --> Redis
    CQRS --> KafkaBroker
    KafkaBroker --> KafkaConsumer
    KafkaConsumer --> SmartContract
    CoreBackend --> Cloudinary
    CoreBackend --> Mailtrap
```

---

## 3. Domain-Driven Design (DDD) Bounded Contexts

The system is decomposed into 7 autonomous Bounded Contexts:

| Bounded Context | Core Aggregate Roots | Key Responsibilities |
|---|---|---|
| **Identity & Access** | `Student`, `Landlord`, `User` | University credentials validation, landlord KYC, OTP verification, JWT session tokens, RBAC. |
| **Housing (Apartments)** | `ApartmentEntity`, `ApartmentDocument` | Listing creation, Google Maps coordinates, Cloudinary photo gallery, visibility status, review workflows. |
| **Leases** | `LeaseEntity`, `LeaseRequest` | Formal tenancy agreement lifecycle: creation, student applications, landlord approvals, termination. |
| **Payments** | `PaymentAggregateRoot`, `Receipt` | Installment schedules, receipt validation, payment state transitions (`PENDING` $\rightarrow$ `PAID` $\rightarrow$ `VERIFIED`). |
| **Roommate Matching** | `RoommateProfile`, `LifeCycleHabit` | Multi-criteria lifestyle profiling, preference filtering, compatibility matching calculations. |
| **Notifications** | `NotificationEntity` | Cross-context notifications (email alerts, push alerts, in-app notification center). |
| **Administration** | `AuditLog` | System-wide audit trail recording caller identity, IP, action, timestamp, and metadata. |

---

## 4. Non-Functional Requirements & Security Hardening

### 4.1 Security & Protection
- **Multi-Tier Rate Limiting:** Dedicated rate limits per sensitive action (e.g. login attempts, OTP generation, payment submission, profile updates) to prevent brute-force attacks and denial-of-service.
- **Role-Based Access Control (RBAC):** Strict middleware enforcement of permissions (`isStudent`, `isLandloard`, `isAdmin`).
- **Data Validation:** Runtime input validation using **Zod** (Backend) and **Yup** (Mobile client) to eliminate injection and malformed payload attacks.
- **Security Auditing:** Continuous dependency scanning using **Snyk** and `npm audit`.

### 4.2 Scalability & Performance
- **In-Memory Caching:** High-throughput query caching powered by **Redis** (`RadisCashe.ts`) with cache-invalidation event listeners (`RemoveCashHandler.ts`).
- **Asynchronous Message Streaming:** Non-blocking event emission over **Apache Kafka** decouples core HTTP transactions from background processing and blockchain indexing.
