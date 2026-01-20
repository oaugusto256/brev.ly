import { eq, sql } from "drizzle-orm";
import { LinkNotFoundError } from "../../core/errors";
import { db } from "../../infra/db";
import { urls } from "../../infra/db/schemas";

interface GetLinkByCodeInput {
	shortCode: string;
}

interface GetLinkByCodeOutput {
	id: string;
	originalUrl: string;
	shortCode: string;
	accessCount: number;
	createdAt: Date;
}

export async function getLinkByCode(
	input: GetLinkByCodeInput,
): Promise<GetLinkByCodeOutput> {
	const { shortCode } = input;

	// Increment access count and return the updated link in a single query
	const [link] = await db
		.update(urls)
		.set({
			accessCount: sql`${urls.accessCount} + 1`,
		})
		.where(eq(urls.shortCode, shortCode))
		.returning({
			id: urls.id,
			originalUrl: urls.originalUrl,
			shortCode: urls.shortCode,
			accessCount: urls.accessCount,
			createdAt: urls.createdAt,
		});

	if (!link) {
		throw new LinkNotFoundError(shortCode);
	}

	return link;
}
