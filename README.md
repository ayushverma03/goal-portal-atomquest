# GoalPortal – Enterprise Goal Setting & Performance Tracking Platform

GoalPortal is a full-stack MERN application designed to digitize and automate the complete lifecycle of organizational goal setting, quarterly check-ins, performance monitoring, and evaluation workflows.

The platform replaces spreadsheet-based tracking and email-driven approval processes with a centralized, role-based system that enforces governance rules, automates approvals, tracks progress, and provides real-time organizational analytics.

---

## 🚀 Features

### Multi-Tier Role-Based Access Control (RBAC)

GoalPortal supports three distinct user roles with strictly controlled permissions.

#### Employee

* Create and manage quarterly goal sheets
* Draft, edit, and submit goals
* Track approved objectives
* Update achievement progress during active review periods
* View personal performance metrics

#### Manager (L1)

* Review employee goal sheets
* Approve or reject submissions
* Provide structured feedback
* Edit submitted goals when required
* Monitor team-wide performance through dashboards

#### Admin / HR

* Configure organizational review cycles
* Define active evaluation windows
* Manage users and hierarchy
* Monitor compliance across departments
* Override locked records when necessary
* Access organization-wide reports and analytics

---

## 📋 Business Rule Governance

The platform enforces multiple organizational constraints directly through backend validation.

### Goal Weightage Validation

* Total weightage across all goals must equal exactly **100%**

### Minimum Goal Weightage

* Each goal must carry at least **10% weightage**

### Maximum Goal Limit

* Employees can create a maximum of **8 goals**

### Goal Sheet Locking

* Once approved by a manager, goal sheets become locked
* Structural modifications require administrative intervention

---

## 📊 Performance Tracking & Metrics Engine

### Dynamic Evaluation Windows

Administrators can define review periods using configurable date ranges.

```javascript
windowOpen
windowClose
```

The system automatically determines whether progress updates are allowed based on the active evaluation window.

---

### Achievement Calculation Logic

GoalPortal automatically calculates achievement percentages according to the selected Unit of Measurement (UoM).

#### Numeric / Percentage (Higher is Better)

Achievement % = Actual ÷ Target × 100

Example:

Target: 100
Actual: 80

Achievement = 80%

---

#### Numeric / Percentage (Lower is Better)

Achievement % = Target ÷ Actual × 100

Example:

Target: 10 defects
Actual: 5 defects

Achievement = 200%

---

#### Timeline-Based Goals

Measures completion date against planned deadlines and milestone targets.

---

#### Zero-Based Goals

Used for metrics where zero represents success.

Example:

* Security incidents
* Production outages
* Escalations

Logic:

```text
Actual = 0 → 100%
Actual > 0 → 0%
```

---

## 📈 Reporting & Analytics

### Compliance Export Interface

Generate organization-wide CSV reports containing:

* Employee details
* Goal information
* Planned targets
* Actual achievements
* Achievement percentages
* Approval status

---

### Performance Dashboards

Interactive dashboards provide:

* Goal completion trends
* Department performance distribution
* Achievement breakdowns
* Progress tracking charts

Built using Recharts for real-time visualization.

---

### Audit Trail Logging

All critical actions are tracked and stored.

Examples:

* Goal approval
* Goal rejection
* Administrative overrides
* Locked-sheet modifications
* Performance updates

Audit logs record:

* User ID
* Action performed
* Timestamp
* Previous value
* Updated value

---

## 🏗️ System Architecture

```text
┌────────────────┐
│ React Frontend │
└──────┬─────────┘
       │
       ▼
┌─────────────┐
│ Express API │
└──────┬──────┘
       │
       ▼
┌───────────────┐
│ MongoDB Atlas │
└───────────────┘
```

Authentication is handled using JWT tokens, while MongoDB stores organizational data, goals, reviews, and audit records.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Recharts

### Backend

* Node.js
* Express.js
* JWT Authentication
* Mongoose ODM

### Database

* MongoDB Atlas

### Environment Management

* Dotenv

---

## 📂 Project Structure

```text
goal-portal/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   ├── seed.js
│   └── package.json
│
├── README.md
└── package.json
```

---

# ⚙️ Local Setup

## Prerequisites

Before starting, ensure the following are installed:

* Node.js v18+
* npm
* MongoDB Atlas account

---

## 1. Clone Repository

```bash
git clone https://github.com/ayushverma03/goal-portal-atomquest.git

cd goal-portal-atomquest
```

---

## 2. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret_key
```

---

## 3. Install Dependencies

### Backend

```bash
cd server

npm install
```

### Frontend

```bash
cd ../client

npm install
```

---

## 4. Seed Initial Data

Populate the database with:

* Default roles
* Organizational hierarchy
* Sample users
* Active evaluation windows

```bash
cd ..

node server/seed.js
```

---

## 5. Start Development Servers

### Backend

```bash
cd server

npm run dev
```

Server runs at:

```text
http://localhost:5000
```

---

### Frontend

```bash
cd client

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔐 Authentication Flow

```text
User Login
     │
     ▼
JWT Token Generated
     │
     ▼
Token Stored Client-Side
     │
     ▼
Protected API Requests
     │
     ▼
Role-Based Authorization
```

---

## 🎯 Sample Workflow

### Employee

1. Create quarterly goals
2. Assign weightages
3. Submit for review

### Manager

1. Review submission
2. Approve or reject
3. Provide feedback

### Employee

1. Update achievements during active cycle
2. Submit progress

### Admin / HR

1. Monitor compliance
2. Generate reports
3. Analyze organization-wide performance

---

## 🚧 Future Enhancements

* Email notifications
* Multi-level approvals (L2/L3)
* Goal templates
* OKR support
* PDF report generation
* SSO Integration
* Department-wise benchmarking
* AI-driven performance insights
* Slack / Microsoft Teams integration

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

## 📄 License

This project is developed for educational and enterprise workflow automation purposes.

---

## 👨‍💻 Author

**Ayush Verma**

---

### Built with MERN Stack • JWT Authentication • MongoDB Atlas • Enterprise Workflow Automation
