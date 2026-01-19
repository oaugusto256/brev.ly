# Brev.ly - URL Shortener

A fullstack URL shortener application with analytics and reporting.

## Features

- 🔗 Create shortened URLs
- 📋 List all shortened URLs
- 🗑️ Delete URLs
- 📊 Usage reports and analytics
- ↪️ Automatic redirection

## Project Structure

```
brev.ly/
├── web/          # Frontend (React + TypeScript + Vite)
└── server/       # Backend (Node.js + TypeScript) + DevOps
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies for both projects:

```bash
# Frontend
cd web
pnpm install

# Backend
cd ../server
pnpm install
```

### Development

```bash
# Start frontend (from /web)
pnpm dev

# Start backend (from /server)
pnpm dev
```

## Tech Stack

### Frontend (web/)
- React 18
- TypeScript
- Vite
- TailwindCSS

### Backend (server/)
- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Drizzle ORM

## License

MIT
