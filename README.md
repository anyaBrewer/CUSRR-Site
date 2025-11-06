---

```markdown
# 🧩 Group Sprint 3: Flask Web Application

**Due Date:** November 7, 2025 (Midnight)  
**AI Policy:** ChatGPT or similar tools are allowed.

---

## 🚀 Project Overview
This sprint focuses on developing a **functional Flask web application** that addresses the main customer needs identified in the previous sprint.  
The app combines a Flask back end with a front end built using **HTML, CSS, and JavaScript**, and integrates a **SQLAlchemy database** for authentication, data storage, and retrieval.

Our goal is to deliver a **minimum viable product (MVP)** that solves the core customer problem through well-defined features and clean, modular code.

---

## 🎯 Objectives
- Build a working **Flask app** with core features that address customer needs.  
- Design and implement a **database schema** using SQLAlchemy.  
- Include **user authentication** (sign up, login, logout).  
- Develop a **functional and responsive front end**.  
- Collect and incorporate **stakeholder feedback** to refine the product.

---

## 🧱 Tech Stack
**Backend:** Flask (Python)  
**Frontend:** HTML, CSS, JavaScript  
**Database:** SQLite / PostgreSQL with SQLAlchemy ORM  
**Version Control:** Git & GitHub  
**Optional Libraries:** Bootstrap, Flask-Login, Flask-WTF, etc.

---

## 🗂️ Project Structure (Example)
```

Group_Sprint_3/
│
├── app/
│   ├── **init**.py
│   ├── models.py
│   ├── routes.py
│   ├── forms.py
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── templates/
│       ├── base.html
│       ├── login.html
│       ├── register.html
│       └── dashboard.html
│
├── requirements.txt
├── README.md
├── config.py
├── run.py
└── docs/
├── schema_diagram.png
├── screenshots/
└── stakeholder_feedback/

````

---

## ⚙️ Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-group>/Group_Sprint_3.git
cd Group_Sprint_3
````

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate    # On Mac/Linux
venv\Scripts\activate       # On Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up the Database

```bash
flask shell
>>> from app import db
>>> db.create_all()
>>> exit()
```

### 5. Run the Application

```bash
flask run
```

Then open your browser and navigate to **[http://127.0.0.1:5000/](http://127.0.0.1:5000/)**

---

## 🧩 Minimum Viable Solution (MVS) Features

* ✅ User authentication (registration, login, logout)
* ✅ User dashboard displaying personalized data
* ✅ CRUD operations for main data entities
* ✅ Responsive front-end design
* ✅ Database schema implemented with SQLAlchemy
* ✅ Stakeholder feedback integration

---

## 🗃️ Database Schema

*(See `docs/schema_diagram.png` for diagram)*

**Example Tables:**

* `User` (id, username, email, password_hash)
* `Item` (id, title, description, user_id)
* `Feedback` (id, user_id, message, timestamp)

**Relationships:**

* One-to-many: `User → Item`
* One-to-many: `User → Feedback`

---

## 📋 Agile Workflow

| Sprint Stage              | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **Sprint Planning**       | Defined sprint goal and selected MVP features.         |
| **Task Assignment**       | Assigned issues to team members with estimated effort. |
| **Sprint Kickoff**        | Set milestones and initiated development.              |
| **Daily Stand-ups**       | Brief updates on progress and blockers.                |
| **Development & Testing** | Implemented features and tested functionality.         |
| **Sprint Review**         | Demoed app to stakeholders for feedback.               |
| **Sprint Retrospective**  | Identified successes and improvements for next sprint. |

---

## 📸 Screenshots

Screenshots of each page and their intended user purpose are available in `docs/screenshots/`.
*(Examples: Login page, Dashboard, Data Entry page, Feedback page)*

---

## 💬 Stakeholder Feedback

Stakeholder input was gathered mid-sprint and post-review (see `docs/stakeholder_feedback/`).
Adjustments were made to improve usability, add missing validation, and refine the UI.

---

## 🌟 Extensions (Optional Features)

* Added **Bootstrap styling** for responsive design.
* Integrated optional **API** for external data.
* Implemented **enhanced UI components** for better user experience.
* Added **data visualization** (graphs/tables) using Chart.js or Plotly.

---

## 👥 Team Contributions

| Team Member | Role / Contributions                              | % Contribution |
| ----------- | ------------------------------------------------- | -------------- |
| Member A    | Front-end development, HTML/CSS/JS                | 25%            |
| Member B    | Database schema, SQLAlchemy integration           | 25%            |
| Member C    | Flask routes, authentication                      | 25%            |
| Member D    | Testing, documentation, stakeholder communication | 25%            |

---

## 🧾 References & Acknowledgements

* Flask Documentation: [https://flask.palletsprojects.com](https://flask.palletsprojects.com)
* SQLAlchemy ORM Docs: [https://docs.sqlalchemy.org](https://docs.sqlalchemy.org)
* Bootstrap: [https://getbootstrap.com](https://getbootstrap.com)
* AI Tools Used: ChatGPT for planning, documentation, and debugging assistance.

---

## 🧠 Report Submission

Include your full Sprint 3 report (Google Doc) with:

* Abstract (≤150 words)
* MVS feature list
* Database schema diagram
* Screenshots & stakeholder feedback
* Extensions
* Contribution table
* References / AI use documentation

📂 Upload the completed report to your group’s **Google Drive → Group_Sprint_3 directory.**
