# SentientZone API Layer

This project defines the shared API for the SentientZone Manager and Installer applications. It uses Next.js 14 with the App Router and TypeScript.

## 🧠 Purpose

Provide a structured, role-aware interface to manage and execute field jobs, from lead intake to controller installation and QA review.

This API is **mocked for now**, but structured to scale into a real backend.

---

## 🧱 Core Entities

### `Job`
- Created after appointment completion
- Assigned to an installer
- Contains:
  - `customerName`, `address`, `status`
  - `installerId`
  - One or more `zones`

### `Zone`
- Sub-unit of a job (e.g. “Kitchen”, “Living Room”)
- Contains:
  - `zoneName`, `installMode`
  - `quoteLineItems`, `notes`

### `Checklist`
- Installer-submitted result of SOP completion
- One per job (per zone)
- Contains:
  - `stepsCompleted[]`, `photos[]`, `zoneName`, `installMode`

---

## 🔄 Role Access Overview

| Role             | Job View       | Checklist Submission | QA Review |
|------------------|----------------|-----------------------|-----------|
| Installer        | Assigned only  | ✅                    | ❌        |
| Install Manager  | All jobs       | ❌                    | View only |
| Admin            | All jobs       | ❌                    | ✅        |

---

## 🛣️ API Routes (to be implemented)

| Route                        | Method | Description                         |
|-----------------------------|--------|-------------------------------------|
| `/api/jobs`                 | GET    | Returns all jobs or by `installerId` |
| `/api/jobs/[id]`            | GET    | Returns detailed job view            |
| `/api/jobs/[id]/checklist`  | POST   | Submit checklist per zone            |

These use hardcoded mock data for now.

---

## 🧪 Testing

This repo does not require a DB connection. The API routes return static mock data shaped to reflect production use.

Checklist POST logs the payload and returns `{ success: true }`.

---

## 🧩 Future Extensions

- Replace mock data with Supabase or Prisma DB
- Add authentication and role-based authorization middleware
- Expand to support:
  - `/api/leads`
  - `/api/appointments`
  - `/api/controllers`
  - `/api/qa`
