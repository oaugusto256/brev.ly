import { defineConfig } from "drizzle-kit";

const DATABASE_URL =
	process.env.DATABASE_URL ??
	"postgresql://postgres:postgres@localhost:5432/brevly";

export default defineConfig({
	schema: "./src/infra/db/schemas/index.ts",
	out: "./src/infra/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: DATABASE_URL,
	},
});
