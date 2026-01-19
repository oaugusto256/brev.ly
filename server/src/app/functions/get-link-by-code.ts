import { eq } from "drizzle-orm";
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

	const [link] = await db
		.select({
			id: urls.id,
			originalUrl: urls.originalUrl,
			shortCode: urls.shortCode,
			accessCount: urls.accessCount,
			createdAt: urls.createdAt,
		})
		.from(urls)
		.where(eq(urls.shortCode, shortCode))
		.limit(1);

	if (!link) {
		throw new LinkNotFoundError(shortCode);
	}

	return link;
}
