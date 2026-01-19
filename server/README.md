# Brev.ly Server

Backend API for the Brev.ly URL shortener application.

## Tech Stack

- **Fastify** - HTTP server
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Validation
- **TypeScript** - Type safety

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development database
cd devops/scripts && ./start-dev-db.sh

# Run migrations
pnpm db:migrate

# Start development server
pnpm dev
```

## Features and Rules

- [x] It should be possible to create a link
  - [x] It should not be possible to create a link with a malformed shortened URL
  - [x] It should not be possible to create a link with an already existing shortened URL
- [ ] It should be possible to delete a link
- [x] It should be possible to get the original URL through a shortened URL
- [ ] It should be possible to list all registered URLs
- [ ] It should be possible to increment the access count of a link
- [ ] It should be possible to export created links to CSV
  - [ ] It should be possible to access the CSV through a CDN (Amazon S3, Cloudflare R2, etc)
  - [ ] A random and unique name should be generated for the file
  - [ ] It should be possible to perform listing in a performant way
  - [ ] The CSV should have fields: original URL, shortened URL, access count, and creation date

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brevly
PORT=3333
```

## License

MIT
