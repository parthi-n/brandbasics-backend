# 🧠 BrandBasics — AI-Powered Brand Strategy Generator

[LIVE DEMO](https://brandbasics-fe.vercel.app/)

## 🧩 Problem Statement

Branding is critical for business success, yet many startups and entrepreneurs struggle to articulate their brand identity, mission, or message. Traditional branding processes can be expensive, time-consuming, and hard to access for small teams.

---

## 💡 Idea & Goal

**BrandBasics** is an AI-powered platform that helps users generate professional brand strategies in minutes.  
By entering key details about their business, users receive AI-generated outputs like:

- Brand Positioning
- Mission & Vision
- Messaging Statements
- Brand Promise
- Tone of Voice
- Brand Archetype
- Story, Beliefs, Personality & More

The goal is to **democratize strategic branding** through automation and AI, making it faster, smarter, and more affordable for everyone.

![Login Page](public/login.png)

![Project Page](public/project.png)

![Strategy Form Page](public/strategy-form.png)

![Strategy Page](public/strategy.png)

---

## 🛠 Tech Stack

| Layer         | Tools / Services                              |
| ------------- | --------------------------------------------- |
| **Frontend**  | Next.js, Tailwind CSS                         |
| **Backend**   | Node.js, Express                              |
| **Database**  | POSTGRES SQL                                  |
| **AI Engine** | Chat GPT, Watson NLU (optional hybrid)        |
| **Auth**      | Cookie-based                                  |
| **Hosting**   | Vercel (frontend), Render (backend), NEON(DB) |

---

## 🔄 User Flow

1. **User Onboarding:**

   - User signs in / registers
   - Create projects
   - Enters brand-related inputs (Name, Industry, Values, Target Audience, etc.)

2. **AI Processing:**

   - Backend formats the data into prompts
   - Sends to ChatGPT
   - Applies Branding Rules based on user input (e.g., archetype → tone)

3. **AI Output:**

   - JSON response containing structured brand strategy
   - Rendered into editable blocks on the frontend

4. **User Feedback (Future Plan):**
   - User can rate AI responses for future training
   - Refine branding framework
   - Save/export/share brand documentation

---

## 📒 Data Structure

![user-data](public/user-data.png)
![strategy-data](public/strategy-data.png)

---

## 🔧 Additional Features (Later):

- 🧠 AI Fine-tuning with brand datasets for more precise results
- 📊 Strategy Visualizations (Brand Wheel, Archetype Maps, etc.)
- 📁 Export options: PDF, Figma-friendly, Notion-style docs
- 👥 Collaboration tools (team feedback & editing)
- 🎯 Custom Brand Rule Profiles per user/project
- 🌍 Multilingual brand messaging generation
- 🧬 Integration with OpenAI for hybrid logic and creativity boost

---

## 📌 Status

> 🛠 Currently in development. MVP version in progress with backend–frontend integration using ChatGPT.

---

## 👨‍💻 Author

[Parthiban](https://github.com/parthi-n)
