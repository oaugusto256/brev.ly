import { desc } from "drizzle-orm";
import { db } from "../../infra/db";
import { urls } from "../../infra/db/schemas";

interface ListLinksOutput {
	id: string;
	originalUrl: string;
	shortCode: string;
	shortUrl: string;
	accessCount: number;
	createdAt: Date;
}

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3333";

export async function listLinks(): Promise<ListLinksOutput[]> {
	const links = await db
		.select({
			id: urls.id,
			originalUrl: urls.originalUrl,
			shortCode: urls.shortCode,
			accessCount: urls.accessCount,
			createdAt: urls.createdAt,
		})
		.from(urls)
		.orderBy(desc(urls.createdAt));

	return links.map((link) => ({
		...link,
		shortUrl: `${BASE_URL}/${link.shortCode}`,
	}));
}
