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
- pnpm
- Docker (for database)

### Installation & Setup

#### 1. Backend (server)

```bash
cd server

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your settings

# Start the database
docker compose -f devops/docker/docker-compose.dev.yml up -d

# Run migrations
pnpm db:migrate

# Start the server
pnpm dev
```

The server will be running at `http://localhost:3333`

#### 2. Frontend (web)

```bash
cd web

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your settings

# Start the development server
pnpm dev
```

The application will be running at `http://localhost:3000`

### Environment Variables

**Server (.env)**
```env
PORT=3333
BASE_URL=http://localhost:3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brevly
```

**Web (.env)**
```env
VITE_FRONTEND_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3333
```

> See individual README files for complete environment variable documentation.

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
