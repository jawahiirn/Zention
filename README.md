# 🧪 ZENTION


![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-111827?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![Convex](https://img.shields.io/badge/Convex-2F80ED?style=for-the-badge&logo=vercel&logoColor=white)  
![Clerk](https://img.shields.io/badge/Clerk-3B49DF?style=for-the-badge&logo=clerk&logoColor=white)

---
## ✨ Features

### Authentication

- Google, GitHub, and email/password sign-in
- Persistent session management with secure authentication

### Content Management

- Intuitive, collapsible & resizable sidebar
- Quick document search, delete, archive, and trash management
- Dark, light, and system color modes

### Document

- Customizable icons and covers
- Title support with an advanced rich-text editor
- Publish documents with real-time collaborative updates

---

## 🚀 Overview

**ZENTION** is a modern, full-stack web application built with the [Next.js App Router](https://nextjs.org/docs/app).

It features:

- ⚡ **Convex** — Real-time backend logic and reactive database  
- 🛡 **Clerk** — Authentication & session management  
- 🎨 **Tailwind CSS + ShadCN UI** — Beautiful, reusable components  
- 🔐 **TypeScript** — Robust type safety and enhanced developer experience  

> _Designed for speed, scale, and joyful development._

---

## 🧱 Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="40" alt="Next.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" alt="Tailwind CSS" />
  <img src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" width="40" alt="ShadCN UI" />
  <img src="https://avatars.githubusercontent.com/u/101835560?s=200&v=4" width="40" alt="Convex" />
  <img src="https://avatars.githubusercontent.com/u/103019437?s=200&v=4" width="40" alt="Clerk" />
</p>

---

## 📂 Folder Structure

```txt
.
├── app/                 # App Router pages & layouts
│   ├── (main)/          # Authenticated routes
│   ├── (marketing)/     # Landing page
│   ├── (public)/        # Public document pages
│   ├── api/             # EdgeStore upload APIs
│   ├── providers/       # Global context providers
│   ├── error.tsx        # Global error boundary page
│   └── layout.tsx       # Root app layout
│
├── components/          # Shared reusable components
│   ├── ui/              # Wrapped ShadCN UI components
│   ├── layout/          # Navbar, sidebar, page shell
│   ├── auth/            # Clerk UI components
│   └── ...              # Other custom components
│
├── lib/                 # Utility functions and libraries
│   ├── edgestore.ts     # EdgeStore setup for uploads
│   └── utils.ts         # General utility helpers
│
├── convex/              # Convex backend logic
│   ├── schema.ts        # Data models and validation
│   ├── documents.ts     # Document operations
│   └── auth.ts          # Server-side auth guards
│
├── store/               # Zustand global state store
├── middleware.ts        # Clerk middleware for route protection
├── public/              # Static files
├── .env.local           # Environment variables
└── README.md            # This file
```

---

## 🛠 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```
### 3. Start backend / convex server
```bash
npx convex dev
```
---

## 🤝 Contributing

Contributions are welcome! Feel free to fork, submit pull requests, or open issues. Let’s build something awesome together.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
---