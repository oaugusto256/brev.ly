# Brev.ly Web

Frontend application for the Brev.ly URL shortener.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Validation

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Backend server running (see [server README](../server/README.md))

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the web folder (see [Environment Variables](#environment-variables) for all options):
   ```env
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_BACKEND_URL=http://localhost:3333
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be running at `http://localhost:5173`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with link creation form and links list |
| `/:shortCode` | Redirect page - fetches original URL and redirects |
| `*` | 404 page for invalid routes or non-existing short codes |

## Features and Rules

- [x] It should be possible to create a link
  - [x] It should not be possible to create a link with a malformed shortened URL
  - [x] It should not be possible to create a link with an already existing shortened URL
- [x] It should be possible to delete a link
- [x] It should be possible to get the original URL through a shortened URL
- [x] It should be possible to list all registered URLs
- [x] It should be possible to download a CSV with the link report


## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-base` | #2C46B1 | Primary actions, links |
| `blue-dark` | #2C4091 | Hover states |
| `gray-100` | #F9F9FB | Background |
| `gray-200` | #E4E6EC | Borders, dividers |
| `gray-300` | #CDCFD5 | Input borders |
| `gray-400` | #74798B | Placeholder text |
| `gray-500` | #4D505C | Secondary text |
| `gray-600` | #1F2025 | Primary text |
| `danger` | #B12C4D | Error states |

### Typography

| Name | Size | Line Height | Weight | Case |
|------|------|-------------|--------|------|
| Text XL | 24px | 32px | Bold | Default |
| Text LG | 18px | 24px | Bold | Default |
| Text MD | 14px | 18px | SemiBold | Default |
| Text SM | 12px | 16px | Regular/SemiBold | Default |
| Text XS | 10px | 14px | Regular | Uppercase |

Font family: **Open Sans** (Google Fonts)

### Components

- **Button** - Primary and secondary variants with hover/disabled states
- **IconButton** - Icon-only button with tooltip
- **Input** - Text input with label and error states
- **Logo** - Brand logo with icon and text
- **Glitch404** - Glitch effect for 404 page

### Icons

Icons from [Phosphor Icons](https://phosphoricons.com/) library.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (Button, Input, etc.)
│   └── ...          # Feature components
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── home.tsx     # Home page (/)
│   ├── redirect.tsx # Redirect page (/:shortCode)
│   └── not-found.tsx # 404 page
├── services/        # API services
├── styles/          # Global styles
├── types/           # TypeScript types
├── utils/           # Utility functions
├── app.tsx          # App component with router
└── main.tsx         # Entry point
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## Environment Variables

```env
# Frontend URL (used for generating short links display)
VITE_FRONTEND_URL=http://localhost:5173

# Backend API URL
VITE_BACKEND_URL=http://localhost:3333
```

## API Integration

The frontend connects to the backend API for all operations:

| Action | Endpoint | Method |
|--------|----------|--------|
| Create link | `/links` | POST |
| List links | `/links` | GET |
| Get link | `/:shortCode` | GET |
| Delete link | `/links/:id` | DELETE |
| Export CSV | `/links/export` | POST |

## License

MIT
