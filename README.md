# GoalPortal - Enterprise Goal Setting & Performance Tracking Platform

GoalPortal is a full-stack, high-fidelity MERN application designed to digitize and automate the end-to-end lifecycle of organizational goal setting, quarterly check-ins, and performance evaluation[cite: 1]. The platform eliminates fragmented tracking methods like spreadsheets and email chains by introducing automated governance, role-based workflows, and real-time analytical data aggregation[cite: 1].

---

## 🚀 Key Features & System Capabilities

### 1. Multi-Tier Role-Based Access Control (RBAC)
The portal supports three distinct user personas, each with strictly segregated access levels and administrative capabilities[cite: 1]:
*   **Employee:** Draft, edit, and submit quarterly Goal Sheets; track locked objectives and update operational progress[cite: 1].
*   **Manager (L1):** Access a team dashboard to inline-review, edit, approve, or return goal sheets for rework with structured feedback loops[cite: 1].
*   **Admin / HR:** Configure company evaluation cycles, enforce corporate time-windows, monitor organizational compliance, and manage system audit exceptions[cite: 1].

### 2. Automated Business Rule Governance (Phase 1)
Built-in backend schema guardrails strictly enforce corporate compliance parameters during goal creation[cite: 1]:
*   **Total Weightage Validation:** Enforces that the total weightage across an employee's goal sheet must equal exactly 100%[cite: 1].
*   **Granular Minimum Boundaries:** Enforces a minimum weightage boundary of 10% per individual goal to prevent trivial entry diluting[cite: 1].
*   **Resource Caps:** Imposes a strict maximum limit of 8 goals per employee profile[cite: 1].
*   **State Locking:** Upon manager approval, goal sheets are instantly locked down to prevent post-facto structural tampering without admin intervention[cite: 1].

### 3. Mathematical Metrics Engine & Time-Window Enforcement (Phase 2)
*   **Dynamic Active Windows:** Automated checking mechanisms match system timelines against database-configured dates (`windowOpen` to `windowClose`) to lock or unlock active quarterly check-in capturing[cite: 1].
*   **Multi-Conditional Scoring Formulas:** Automatically computes real-time achievement progress scores based on the specific Unit of Measurement (UoM) configured for the goal[cite: 1]:
    *   *Numeric/Percentage Min (Higher is Better):* $\text{Achievement} \div \text{Target}$[cite: 1]
    *   *Numeric/Percentage Max (Lower is Better):* $\text{Target} \div \text{Achievement}$[cite: 1]
    *   *Timeline (Date-Based):* Measures completion date against deadline milestones[cite: 1].
    *   *Zero-Based (Zero = Success):* Returns 100% if actual entry is 0, else returns 0%[cite: 1].

### 4. Reporting, Governance & Analytics
*   **Compliance Export Interface:** Generates and streams down real-time organization-wide data into exportable CSV formats showing Planned Targets vs. Actual Achievements for HR processing[cite: 1].
*   **Live Performance Dashboards:** Aggregates database values into visual charts using Recharts, presenting real-time goal achievement trends and distributions[cite: 1].
*   **Transactional Audit Trails:** Tracks critical structural state changes post-approval, logging precise cryptographic stamps detailing who changed what data and exactly when[cite: 1].

---

## 🛠️ Technology Stack

*   **Frontend:** React.js, Vite, Tailwind CSS, Recharts, Axios, React Router DOM
*   **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Mongoose ODM
*   **Database:** MongoDB Atlas (Cloud-hosted NoSQL)
*   **Environment Management:** Dotenv

---

## ⚙️ Installation & Local Setup

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Atlas connection string

### 1. Clone the Repository
```bash
git clone [https://github.com/ayushverma03/goal-portal-atomquest.git](https://github.com/ayushverma03/goal-portal-atomquest.git)
cd goal-portal-atomquest
