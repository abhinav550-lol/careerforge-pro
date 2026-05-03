# CareerForge Pro 🚀 | AI-Powered Resume Architect

CareerForge Pro is a next-generation **AI-First SaaS** platform built to dominate the modern job market. Powered by **Gemini 3 Flash**, it moves beyond static interfaces to provide actionable career intelligence through a supercharged MERN stack.

## 🧠 Cognitive Architecture
*   **The Brain**: Gemini 3 Flash (via Google AI SDK) provides industry-leading inference speed and multimodal reasoning[cite: 11].
*   **The Memory**: MongoDB Atlas Vector Search handles semantic embeddings for RAG-based context retrieval[cite: 11].
*   **The Orchestrator**: Node.js and LangChain.js manage the "Chain of Thought" logic and JD-Resume mapping[cite: 11].
*   **The Interface**: React.js utilizing Server-Sent Events (SSE) for instantaneous, streaming AI text delivery[cite: 11].

## ✨ Key Features
*   **Gemini-Powered ATS Audit**: Real-time industry matching with high compatibility accuracy across professional fields[cite: 11].
*   **Executive Cover Letter Forge**: An agentic system that rewrites bullet points and creates tailored letters under 300 words[cite: 11].
*   **Success Hub Dashboard**: A centralized repository featuring real-time AI credit tracking and ATS readiness stats[cite: 8, 11].
*   **Pixel-Perfect PDF Rendering**: Backend Puppeteer service for non-editable, professionally formatted PDF output[cite: 11].
*   **SaaS Billing Engine**: Full Stripe integration supporting "Standard Engine" and "Executive Suite" tiers[cite: 8, 11].

## 🛠️ Tech Stack
*   **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React, Redux Toolkit.
*   **Backend**: Node.js, Express, MongoDB Atlas, Mongoose.
*   **AI/ML**: Gemini 3 Flash API, pdf-parse-new, LangChain.js.
*   **Infrastructure**: Stripe API, Puppeteer, Multer, Docker.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account (with Vector Search enabled)
*   Gemini API Key (Google AI Studio)

### Installation
1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/careerforge-pro.git](https://github.com/yourusername/careerforge-pro.git)
    cd careerforge-pro
    ```

2.  **Backend Configuration**
    ```bash
    cd backend
    npm install
    ```
    Configure `.env`:
    ```env
    PORT=5001
    MONGODB_URI=your_mongodb_uri
    GEMINI_API_KEY=your_gemini_3_flash_key
    STRIPE_SECRET_KEY=your_stripe_key
    STRIPE_PRO_PLAN_PRICE_ID=price_your_id
    FRONTEND_URL=http://localhost:5173
    ```

3.  **Frontend Configuration**
    ```bash
    cd ../frontend
    npm install
    ```
    Configure `.env`:
    ```env
    VITE_APP_URL=http://localhost:5001
    ```

4.  **Run Development Environment**
    ```bash
    # Run Backend & Frontend respectively
    npm run dev
    ```

## 🛡️ Reliability & Scale
*   **Exponential Backoff**: Custom retry logic handles 429 (Rate Limit) and 503 (Overloaded) errors for the Gemini API[cite: 10].
*   **Containerization**: Mandatory Docker support ensures environment consistency across staging and production[cite: 11].
*   **Secure Webhooks**: Stripe webhooks ensure immediate "Pro" status activation upon payment[cite: 11].

---
*Developed by Pratik Suthar as part of the Zaalima Development AI Engineering Division.*



👨‍💻 Developed By
Pratik Suthar Full Stack Developer & UI/UX Designer Built for the 2026 Modern Web Standards.
Abhinav Mishra - Full Stack Developer
Sujata - Full Stack Developer
Niharika - Full Stack Developer 

### Why this is better:
1.  **Direct Value:** It clearly explains that the project beats **ATS algorithms**, which is the biggest pain point for job seekers.
2.  **Tech Breakdown:** It separates Frontend and Backend so recruiters can see you understand both sides of the stack.
3.  **Security Focus:** Mentioning the **"Secure Handshake"** shows you understand web secure
