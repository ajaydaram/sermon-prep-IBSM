# 📖 Scribe Ezra Pro: Inductive Bible Study Methods (IBSM) Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

**Scribe Ezra Pro** is a professional, industry-standard Web Application and Homiletics Studio designed for **Inductive Bible Study Methods (IBSM)**, exegesis, systematic theology, and sermon preparation.

---

## 🌟 Key Features

### 1. 7-Stage Progressive Exegesis Pipeline
Progressively guides students, pastors, and scholars through the complete workflow of biblical interpretation:
1. 🔍 **Observation**: Passage Identity, Redemptive-Historical Setting, Literary Structure, Keywords, and Grammar.
2. 💡 **Interpretation**: Authorial Intent, Divine Intent, Meaning, AI Confidence Ratings, and Historical Tradition Evaluation Grid (Reformation, Early Church, Medieval, Modern).
3. 📜 **Biblical Theology**: Fallen Condition Focus (FCF), Canonical Progress Timeline (`Creation → Fall → Israel → Christ → Church → New Creation`), and Christological fulfillment.
4. 🏛️ **Systematic Theology**: Core Doctrines, Attributes of God, and Confessional Links (Westminster Confession of Faith WCF, 1689 London Baptist, Three Forms of Unity).
5. ❤️ **Practical Application**: Mind (truth to believe), Heart (affections to cultivate), Hands (actions to obey), Church, and Mission.
6. 🎙️ **Teaching & Ministry**: Big Idea formula, Sermon Aim, Discussion Questions, and Preaching/Interpretive Pitfalls to avoid.
7. ✦ **Reasoning Trail**: Transparent step-by-step trace showing *Observation → Interpretation → Theological Synthesis → Application* for discipleship.

### 2. Pre-loaded Exegesis Library
Contains complete, syllabus-compliant exegesis projects:
- 👑 **Melchizedek (Hebrews 7:1-28 / Genesis 14 / Psalm 110)**: The Eternal Priesthood of Christ.
- 📜 **2 Timothy ("Be Faithful")**: Paul's charge to Timothy under Roman imprisonment.
- 🦁 **Daniel 1–5 ("God's Sovereignty Over Nations")**: Exile, Nebuchadnezzar's dream, and Belshazzar's feast.
- 🏛️ **Haggai 1:1–15 ("Temple Restoration & Present Hope")**: Post-exilic priority of rebuilding God's house.
- 🌏 **Acts 1:8 & John 14:1–3**

### 3. 3-Pillar Homiletics & Sermon Studio
- **Exegesis ➔ Theology ➔ Homiletics** Tabbed Preparation Workflow.
- The **3 Developmental Questions**:
  1. *"Explain it"* (Explanation)
  2. *"Prove it"* (Validation)
  3. *"Apply it"* (Application)
- **Sermon Form Selector**: Deductive, Inductive, or Semi-Inductive.
- **One-Click Manuscript Exporter**: Copy full formatted sermon manuscripts to clipboard.

### 4. Automatic Observation Generator Engine
- One-click rule-based NLP extraction of verbs, structural connectives (*"but"*, *"for"*, *"therefore"*, *"without"*), key titles, staccato patterns, and literary atmosphere.
- 100% offline-resilient with instant speed.

### 5. Academic Linter & BS510 Rubric Evaluator
- Automated rule-checking against seminary syllabus rubrics:
  - **Rule of Division**: Checks that `I.` has `II.` and `A.` has `B.`.
  - **Single Space Period**: Flag double spacing after periods.
  - **Biblical Past Tense**: Verifies historical narrative descriptions use past tense.
  - **Parenthetical Citation Formatting**.

### 6. Original Languages & Strong's Lexicon
- Interlinear verse workbench supporting **NASB 2020**, **ESV**, **NET**, Greek (**SBLGNT**), and Hebrew (**BHS**).
- Strong's Concordance and Lexicon modal for deep word studies.

---

## 🛠️ Getting Started & Run Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm**

### Installation & Execution

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ajaydaram/sermon-prep-IBSM.git
   cd sermon-prep-IBSM
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**:
   Create a `.env` or `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=3000
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at **http://localhost:3001** (or port 3000).

5. **Type Checking & Linting**:
   ```bash
   npm run lint
   ```

6. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🏗️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind-styled Vanilla CSS, Motion (Framer Motion), Lucide Icons.
- **Backend / Dev Server**: Express.js, TSX (`server.ts`).
- **AI Integration**: Google Gemini API (`@google/genai`).
- **Build Tool**: Vite & ESBuild.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.