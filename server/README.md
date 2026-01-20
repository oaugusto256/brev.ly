# Brev.ly Server

Backend API for the Brev.ly URL shortener application.

## Tech Stack

- **Fastify** - HTTP server
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Validation
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Docker (for database)

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the server folder (see [Environment Variables](#environment-variables) for all options):
   ```env
   PORT=3333
   BASE_URL=http://localhost:3333

   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brevly
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=brevly
   POSTGRES_PORT=5432
   ```

3. **Start the database**
   ```bash
   docker compose -f devops/docker/docker-compose.dev.yml up -d
   ```

4. **Run migrations**
   ```bash
   pnpm db:migrate
   ```

5. **Start the server**
   ```bash
   pnpm dev
   ```

The server will be running at `http://localhost:3333`

## API Documentation

This API is documented using **OpenAPI 3.0** specification with **Swagger UI**.

📚 **Interactive docs available at:** `http://localhost:3333/docs`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/links` | Create a new shortened link |
| `GET` | `/links` | List all links |
| `GET` | `/:shortCode` | Get original URL by short code (increments access count) |
| `DELETE` | `/links/:id` | Delete a link |
| `POST` | `/links/export` | Export all links to CSV |
| `GET` | `/health` | Health check |

### Create Link

```bash
POST /links
Content-Type: application/json

{
  "originalUrl": "https://example.com",
  "shortCode": "my-link"  # optional, auto-generated if not provided
}
```

### List Links

```bash
GET /links
```

### Get Link by Short Code

```bash
GET /:shortCode
```

### Delete Link

```bash
DELETE /links/:id
```

### Export to CSV

```bash
POST /links/export
```

Returns a URL to download the CSV file from cloud storage.

## Features and Rules

- [x] It should be possible to create a link
  - [x] It should not be possible to create a link with a malformed shortened URL
  - [x] It should not be possible to create a link with an already existing shortened URL
- [x] It should be possible to delete a link
- [x] It should be possible to get the original URL through a shortened URL
- [x] It should be possible to list all registered URLs
- [x] It should be possible to increment the access count of a link
- [x] It should be possible to export created links to CSV
  - [x] It should be possible to access the CSV through a CDN (Amazon S3, Cloudflare R2, etc)
  - [x] A random and unique name should be generated for the file
  - [x] It should be possible to perform listing in a performant way
  - [x] The CSV should have fields: original URL, shortened URL, access count, and creation date

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
# Server
PORT=3333
BASE_URL=http://localhost:3333

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/brevly
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=brevly
POSTGRES_PORT=5432

# Cloudflare R2 (optional - for CSV export to cloud)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=brevly
CLOUDFLARE_PUBLIC_URL=
```

> **Note:** If Cloudflare R2 is not configured, CSV exports will be saved locally to `./uploads/` and served via the API.

## License

MIT
