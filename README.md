# 🌟 HolisticFit (CORE.QUEST)

> **Gamify Your Wellness, Level Up Your Life.**  
> A self-improvement RPG where you complete daily positive habits, earn gold coins (GP), level up your rank, and redeem your achievements for wellness rewards.

---

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.2-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Demo Account](#-demo-account)
- [Available Scripts](#-available-scripts)
- [Upcoming Roadmap](#-upcoming-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 💡 Overview

**HolisticFit** transforms personal wellness, discipline, and habit building into an interactive Role-Playing Game (RPG). Traditional habit trackers often feel like tedious chores; HolisticFit turns self-care into rewarding quests.

Every positive action—whether it is morning cardio, reading a chapter of a book, practicing mindfulness, or learning a new skill—earns you **Gold Coins (GP)**. Accumulate GP to level up your character, advance your RPG rank, and unlock tangible self-care rewards and discounts in the built-in **Rewards Store**.

---

## ✨ Key Features

### ⚔️ 1. Interactive Quest Dashboard
- **Real-Time Overview**: View current streak count, total gold coin balance, and daily habit completion rate at a glance.
- **Dynamic Greetings**: Time-of-day contextual greeting with customized user avatar.
- **High-Yield Habits**: Quick-action card highlighting active habits sorted by coin payouts.
- **Featured Rewards**: Direct showcase of store rewards ready for redemption.

### 📋 2. Comprehensive Habit & Task Tracking
- **Rich Habit Library**: Pre-loaded with 30 diverse positive habits spanning fitness, mental health, creativity, nutrition, and lifelong learning.
- **Custom Quest Creator**: Create custom habits with tailored titles, descriptions, and coin rewards (from 5 to 200 GP).
- **24-Hour Reset Cycle**: Automatic live countdown timers on completed tasks with reset cycle tracking.
- **Filters & Search**: Instantly filter between Active, Completed, or Custom habits, and find tasks with fast real-time search.

### 🛍️ 3. Rewards Store & Redemption System
- **Wellness Marketplace**: Redeem earned GP for healthy rewards (e.g., free books, gym gear discounts, nutrition consultations, wellness retreats).
- **Unique Redemption Codes**: Generates cryptographic-style redemption vouchers upon purchase.
- **My Rewards Inventory**: Easily track purchased items, view voucher codes, copy codes to clipboard with one click, and toggle used/unused status.
- **Custom Rewards**: Add your own real-world custom rewards and costs to incentivize personal goals.

### 🛡️ 4. RPG Character Progression & Ranks
- **Leveling Curve**: Progress through levels for every 500 GP earned.
- **Prestige Titles**:
  - 🌱 **Level 1–2**: *Self-Discovery Seeker*
  - ⚔️ **Level 3–4**: *Discipline Novice*
  - 🧘 **Level 5–6**: *Mindfulness Expert*
  - 🏆 **Level 7–9**: *Habit Champion*
  - 🌌 **Level 10+**: *Self-Improvement Archon*
- **Stats & Achievements**: Dedicated User Profile tracking completed habits, custom tasks, total claimed rewards, and active streaks.

### 🔐 5. Frictionless Authentication & Local Persistence
- **Instant Demo Mode**: One-click login into a pre-populated test account (`Alex (Demo)`).
- **Custom Accounts**: Secure signup and login workflow.
- **Offline-First Storage**: Powered by browser `localStorage`, ensuring immediate responsiveness, privacy, and zero database setup required for local development.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Modern component-based UI framework |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety and robust developer experience |
| **[Vite 6](https://vitejs.dev/)** | Ultra-fast build tool and dev server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | High-performance, modern utility-first CSS styling |
| **[Motion (Framer Motion)](https://motion.dev/)** | Smooth transitions, micro-interactions, and animations |
| **[Lucide React](https://lucide.dev/)** | Clean, lightweight iconography |
| **[Google GenAI SDK](https://github.com/google-gemini/generative-ai-js)** | Pre-configured readiness for Google Gemini AI features |

---

## 📂 Project Architecture

```
holisticfit/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular UI components
│   │   ├── AuthScreen.tsx    # Login, signup & demo access screen
│   │   ├── Dashboard.tsx     # Hero overview, stats, streaks & quick actions
│   │   ├── Navigation.tsx    # Top navbar with user status & tab switching
│   │   ├── RewardsStore.tsx  # Marketplace, custom rewards & voucher inventory
│   │   ├── TasksList.tsx     # Habit checklist, search, filters & custom quest creator
│   │   └── UserProfile.tsx   # Character sheet, RPG rank badges & progress resets
│   ├── context/
│   │   └── AppContext.tsx    # Global React Context, state logic & localStorage sync
│   ├── data/
│   │   └── defaults.ts       # 30 default habits and curated store rewards
│   ├── types.ts            # TypeScript interfaces for User, Task, Reward, RedemptionCode
│   ├── App.tsx             # Root layout and view controller
│   ├── main.tsx            # React application entrypoint
│   └── index.css           # Global Tailwind CSS directives and theme setup
├── .env.example            # Environment variable template
├── metadata.json           # AI Studio applet metadata & capabilities
├── package.json            # Node.js dependencies and project scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite & Tailwind plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version **18.x** or higher recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chadivesaisasidharreddy098/holisticfit.git
   cd holisticfit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Copy `.env.example` to `.env` if you plan to integrate Google Gemini AI features:
```bash
cp .env.example .env
```

Configure your variables inside `.env`:
```env
# Optional: Required for future Gemini AI coaching/API integrations
GEMINI_API_KEY="your_google_gemini_api_key"

# Optional: Host URL for self-referential links or deployment
APP_URL="http://localhost:3000"
```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🎮 Demo Account

To explore the application without registering a new profile, click **"Demo Access"** on the authentication page, or sign in using:

- **Email**: `alex@example.com`
- **Password**: `password123`

The demo account comes preloaded with:
- 💰 **350 GP** starting balance
- ⚡ 3 completed habits to showcase streaks and countdown timers
- 🎫 1 pre-redeemed book voucher to inspect the rewards inventory

---

## 📜 Available Scripts

In the project root, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode on `http://localhost:3000` |
| `npm run build` | Builds the optimized production bundle into the `dist/` folder |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Type-checks code using TypeScript without emitting output (`tsc --noEmit`) |
| `npm run clean` | Cleans up the `dist/` directory and build artifacts |

---

## 🗺️ Upcoming Roadmap

- [ ] **AI Habit Coaching**: Personalized habit recommendations powered by Google Gemini.
- [ ] **Wearable Sync**: Integration with Google Fit / Apple Health for automated fitness quest completions.
- [ ] **Party Quests & Guilds**: Multiplayer habit challenges and co-op boss battles with friends.
- [ ] **Cloud Backend**: Optional cloud synchronization via Firebase or Supabase.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/EpicHabit`)
3. Commit your changes (`git commit -m 'feat: Add EpicHabit quest feature'`)
4. Push to the branch (`git push origin feature/EpicHabit`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
