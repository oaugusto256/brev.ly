import { eq } from "drizzle-orm";
import { LinkNotFoundError } from "../../core/errors";
import { db } from "../../infra/db";
import { urls } from "../../infra/db/schemas";

interface DeleteLinkInput {
	id: string;
}

export async function deleteLink(input: DeleteLinkInput): Promise<void> {
	const { id } = input;

	const [deleted] = await db
		.delete(urls)
		.where(eq(urls.id, id))
		.returning({ id: urls.id });

	if (!deleted) {
		throw new LinkNotFoundError(id);
	}
}
