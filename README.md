<!-- LOGO -->

<div align="center">
  <img src="https://github.com/Risspecct/Learnex/blob/dev/frontend/public/learnex-logo.svg" alt="Learnex Logo" width="120" height="120">
</div>

<h1 align="center">💡 Learnex: Bridging India's Educational Divide</h1>

<div align="center">
  <b>A gamified, AI-powered learning platform designed to make STEM education accessible, engaging, and inclusive for students across India.</b>
</div>

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" alt="Build Status">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/version-1.0.0-informational?style=for-the-badge" alt="Version">
</div>

---

## 🚀 Overview

Learnex was built in response to the *“Gamified Learning Platform for Rural Education”* challenge issued by the Government of Odisha. It aims to strengthen STEM education for grades 6–12 — even in low-connectivity regions — through **offline learning, regional language support, and interactive modules**.

---

## 🎯 The Mission

Education should never be limited by geography or language. Learnex bridges that gap by combining **technology, gamification, and AI** to make quality learning available to every student — whether they’re in Bhubaneswar or a remote village in Odisha.

---

## 🧠 Core Features

| Feature                              | Description                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🎮 **Gamified Offline Learning**     | Access a library of interactive games that work even without internet. The *Advanced Physics Lab* module lets students explore scientific concepts hands-on. |
| 🤖 **AI-Powered Content Generation** | Smart AI models craft relatable examples using real-world rural contexts — like farming or cooking — to simplify STEM concepts.                              |
| 🌐 **Multi-Language Accessibility**  | Real-time AI translation converts all content into regional languages such as Hindi, Odia, and Bengali.                                                      |
| 📊 **Actionable Teacher Analytics**  | Teachers get clear dashboards showing student progress, enabling personalized feedback and early intervention.                                               |

---

## 🖼️ Platform Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/fa843398-9722-4e42-80ab-82fe980009e0" alt="Learnex Dashboard Overview" width="90%">
  <br>
  <i>Learnex Dashboard: A unified interface for students and educators</i>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d97e4b10-d26f-49e0-bc4d-dc7b78bb3e92" width="48%" alt="Gamified Physics Lab">
  <img src="https://github.com/user-attachments/assets/d36887ba-77df-42cb-95ae-e6248df05e6f" width="48%" alt="AI Tools and Translation">
  <br>
  <i>Gamified modules and AI-powered educational tools</i>
</p>

<p align="center">
<img width="96%" alt="Teacher Dashboard" src="https://github.com/user-attachments/assets/020a79a8-44d4-4c48-bc4e-227260d455ad">
<br>
<i>The Teacher Dashboard provides clear, subject-wise analytics.</i>
</p>

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                                                                                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react\&logoColor=black\&style=for-the-badge) ![Phaser](https://img.shields.io/badge/Phaser-882D9E?logo=phaser\&logoColor=white\&style=for-the-badge)            |
| **Backend**  | ![Spring Boot](https://img.shields.io/badge/Spring-6DB33F?logo=spring\&logoColor=white\&style=for-the-badge) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi\&logoColor=white\&style=for-the-badge) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white\&style=for-the-badge)                                                                                                     |

---

## ⚙️ Getting Started

Follow these steps to set up Learnex locally:

### 🔧 Prerequisites

* Java JDK 21 & Maven
* Python 3.8+
* Node.js & npm
* PostgreSQL running instance

### 🧩 Backend Setup (Spring Boot & Python)

<details>
<summary><b>Click to expand instructions</b></summary>

#### Spring Boot Server (Port 8080)

```bash
cd backend/Spring-Boot
# Configure database in src/main/resources/application.properties
mvn spring-boot:run
```

#### Python AI Server (Port 8000)

```bash
cd backend/Python
python -m venv venv
.\\venv\\Scripts\\activate   # Windows
pip install -r requirements.txt
# Add your Google API key
# .env → GOOGLE_API_KEY="your-key-here"
uvicorn main:app --reload
```

</details>

### 💻 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173)

---

## 🧭 Road Ahead

* Integrate adaptive learning using ML-based progress tracking.
* Add voice-assisted navigation for accessibility.
* Expand offline capabilities to cover all STEM subjects.

---

<p align="center">
  <b>🌱 Learnex — Empowering India’s next generation of learners, one classroom at a time.</b>
</p>
