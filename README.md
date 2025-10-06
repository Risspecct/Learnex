# 💡 Learnex: Empowering Education for All

**Learnex is a comprehensive digital platform designed to bridge the educational gap by providing accessible, engaging, and modern learning tools for students and teachers across India.**

---
## 🎯 SIH Problem Statement

This project is a direct response to the problem statement titled **"Gamified Learning Platform for Rural Education"** issued by the **Government of Odisha**.

> ### Description
> Build a gamified digital platform to enhance learning outcomes for students in rural schools (grades 6-12), focusing on STEM subjects. The platform should use interactive games, multilingual content, and offline access to engage students with limited internet connectivity.

| Detail | Information |
| :--- | :--- |
| **Problem Statement ID** | `25048` |
| **Organization** | Government of Odisha |
| **Department** | Electronics & IT Department |
| **Category** | Software |
| **Theme** | Smart Education |

---
## ✨ Our Solution: The Learnex Platform

Learnex tackles these challenges with a unified, multi-faceted platform that empowers both students and educators.

### 🎮 Gamified Offline Learning
Learnex is built to support a library of interactive educational games that work **completely offline**. Our first module, the "Advanced Physics Lab," demonstrates this capability by allowing students to master projectile motion without an internet connection. The platform's architecture is designed to easily incorporate many more games across various STEM subjects in the future.

### 🤖 AI-Powered Content Generation
We use the power of AI to create educational content that is **engaging, age-appropriate, and relatable**. Our system is specifically prompted to use analogies from everyday rural life, making complex STEM topics easier for students to understand and remember.

### 📊 Actionable Analytics for Teachers
Learnex provides a powerful analytics dashboard where teachers can get an at-a-glance overview of class performance. They can drill down into subject-wise averages and individual student scores to easily identify who is excelling and who needs extra help.

### 🌐 Breaking Language Barriers
An integrated AI-powered translator allows content to be instantly translated into various regional languages like Hindi, Odia, and Bengali, making the platform more inclusive and accessible for everyone.

---
## 🚀 Live Demo & Presentation

* **Live Demo Link**: `[Link to your deployed application]`
* **Video Presentation**: `[Link to your project video on YouTube]`

---
## 🛠️ Technology Stack

* **Frontend**: React (Vite), Phaser 3
* **Backend**: Spring Boot (Java), FastAPI (Python)
* **Database**: PostgreSQL

---
## 🏃‍♀️ How to Run the Project Locally

To set up and run the project on your local machine, follow these steps.

### Prerequisites
* Java JDK 21, Maven
* Python 3.8+
* Node.js and npm
* A running PostgreSQL instance

### 1. Backend Setup (Spring Boot & Python)
First, set up and run both backend servers.

* **Spring Boot Server (Port `8080`)**:
    1.  Navigate to `backend/Spring-Boot`.
    2.  Configure your database credentials in `src/main/resources/application.properties`.
    3.  Run the command: `mvn spring-boot:run`.

* **Python AI Server (Port `8000`)**:
    1.  Navigate to `backend/Python`.
    2.  Create and activate a virtual environment (`python -m venv venv`, then `.\venv\Scripts\activate`).
    3.  Create a `requirements.txt` file with the necessary libraries (`fastapi`, `uvicorn`, `google-generativeai`, `python-dotenv`, `googletrans==4.0.0-rc1`).
    4.  Install dependencies: `pip install -r requirements.txt`.
    5.  Create a `.env` file and add your `GOOGLE_API_KEY="your-key-here"`.
    6.  Run the server: `uvicorn main:app --reload`.

### 2. Frontend Setup (React)
Once the backends are running, start the frontend application.

1.  **Navigate to the directory**:
    ```bash
    cd frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

---
