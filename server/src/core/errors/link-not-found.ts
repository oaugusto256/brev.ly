export class LinkNotFoundError extends Error {
	constructor(shortCode: string) {
		super(`Link with short code "${shortCode}" not found`);
		this.name = "LinkNotFoundError";
	}
}
