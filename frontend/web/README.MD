# Student Nest — Web Portal & Administrative Console

**Technology:** React 19, Vite 6, Material-UI (MUI 7), Emotion, React Router v7  
**Target Audience:** Platform Administrators & Commercial Landlords  
**Academic Thesis:** Bachelor of Science in Software Engineering, Middle East University (MEU)  

---

## 1. Portal Overview
The **Student Nest Web Portal** provides an administrative and enterprise dashboard for platform moderators and property managers:
- **Apartment Verification Console:** Review uploaded title deeds, ownership documents, and property photos before listings go live.
- **Audit Log Inspection:** Monitor real-time platform activity, suspicious behavior, and administrative changes recorded by the core audit logger.
- **User & University Management:** Oversee student credentials, landlord KYC approvals, and role permissions.
- **System Metrics & Reports:** Analyze platform occupancy, active leases, and transaction receipts.

---

## 2. Technical Stack
- **React 19 & Vite 6:** Modern frontend framework with lightning-fast Hot Module Replacement (HMR).
- **Material-UI (MUI v7) & Emotion:** Consistent enterprise design language with accessible data tables, modal dialogs, and navigation drawers.
- **React Router v7:** Client-side routing with role-based route guards.

---

## 3. Running Locally

```bash
cd frontend/web

# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```
The web dashboard will be available at `http://localhost:5173`.
