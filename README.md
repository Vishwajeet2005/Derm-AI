<div align="center">
  <h1>DermAI</h1>
  <p><strong>Next-Generation AI-Powered Skin Disease Detection & Diagnostics</strong></p>
  <p>Providing equitable, accurate, and accessible dermatological analysis for all skin types.</p>
</div>

---

## Overview

**DermAI** is a comprehensive, state-of-the-art web application engineered to democratize access to dermatological care. By leveraging a robust **EfficientNetB3** deep learning model, DermAI allows users to seamlessly upload photographs of skin conditions and receive instantaneous, AI-powered diagnostic insights.

A core tenet of DermAI is **diagnostic equity**. The underlying machine learning architecture is explicitly optimized to recognize and accurately diagnose conditions across all **six Fitzpatrick skin tone types**. Furthermore, the application provides an expansive diagnostic net covering over **390 dermatological conditions**, including rare and tropical diseases that are frequently underrepresented in traditional diagnostic tools.

To bridge the gap between digital diagnosis and actionable medical care, DermAI features multilingual voice-based condition explanations, longitudinal tracking for disease progression, and a geolocation-based directory to connect users with specialized, nearby medical professionals.

---

## Key Features

- **Advanced AI Diagnostics:** Powered by a customized EfficientNetB3 Convolutional Neural Network (CNN) architecture, delivering high-confidence predictions and differential diagnosis candidates.
- **Skin Tone Equity (Fitzpatrick Scale):** Algorithmic fairness enforced through balanced training data across all six Fitzpatrick skin types, mitigating diagnostic bias.
- 🔬 **Extensive Condition Library:** Capable of classifying 390+ unique skin conditions, with specialized flags for malignant, potentially malignant, and tropical diseases.
- **Multilingual Voice Explanations:** Web Speech API integration translates complex medical terminology into easily understandable, spoken explanations in the user's preferred language (English, Hindi, Tamil, Telugu, Marathi, Kannada).
- **Longitudinal Progression Tracking:** Real-time visual tracking of skin conditions over weeks or months, allowing patients and clinicians to monitor healing or worsening trends.
- **Hyperlocal Doctor Directory:** Integrates the Haversine formula and geolocation APIs to instantly route patients to verified, nearby dermatologists, complete with consultation fees and insurance compatibility.

---

## System Architecture

DermAI is built on a modern, decoupled microservices architecture deployed via Docker. 

### Frontend (Client Tier)
- **Framework:** React.js (Functional Components, Hooks) configured with Vite for rapid HMR.
- **Styling:** Tailwind CSS for a responsive, utility-first UI design.
- **Routing:** React Router v6 for declarative client-side navigation.
- **State Management & Context:** React Context API for JWT authentication flows.
- **File Uploads:** React Dropzone for robust image ingestion.
- **Accessibility:** Web Speech API integration for auditory feedback.

### Backend (API Tier)
- **Framework:** Python / FastAPI for high-performance, asynchronous REST API delivery.
- **Data Validation:** Pydantic v2 ensuring strict request/response payloads.
- **Authentication:** JWT (JSON Web Tokens) via `python-jose` with `bcrypt` password hashing.
- **Database ORM:** SQLAlchemy for declarative, asynchronous relational database mapping.
- **Image Processing:** Server-side validation and transformation using Pillow.

### Machine Learning (Inference Tier)
- **Engine:** TensorFlow / Keras.
- **Model:** EfficientNetB3 (Input: `300x300x3` RGB tensors).
- **Inference Pipeline:** Image normalization → Softmax probability generation → Diagnostic Framework (Confidence assessment, Urgency categorization).

### Data Persistence (Storage Tier)
- **Relational DB:** PostgreSQL 15 (Users, Diagnoses, Conditions, Doctors).
- **NoSQL / Real-Time:** Firebase Firestore (Dedicated purely for longitudinal progression tracking data).

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- Firebase Admin SDK credentials (`firebase-credentials.json`)

### Installation & Deployment

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Vishwajeet2005/Derm-AI.git
   cd Derm-AI
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Ensure you update `DATABASE_URL`, `SECRET_KEY`, and place your `firebase-credentials.json` in the designated path.*

3. **Deploy via Docker Compose:**
   The entire stack (Frontend, Backend, and PostgreSQL) can be orchestrated using Docker Compose.
   ```bash
   docker-compose up --build -d
   ```

4. **Access the Application:**
   - **Frontend UI:** `http://localhost:3000`
   - **Backend API & Swagger Docs:** `http://localhost:8000/docs`
   - **PostgreSQL Database:** `localhost:5432`

---

## Project Structure

```text
dermai/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Routable application pages
│   │   ├── context/          # React Context (Auth)
│   │   └── api/              # Axios HTTP client
│   └── Dockerfile            # Frontend containerization
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/              # Route handlers / Endpoints
│   │   ├── core/             # Config, Security, Firebase setup
│   │   ├── db/               # SQLAlchemy Models, schemas, sessions
│   │   └── ml/               # Inference, preprocessing, explainers
│   └── Dockerfile            # Backend containerization
├── docker-compose.yml        # Orchestration configuration
└── README.md                 # Project documentation
```
