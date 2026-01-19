export class ShortCodeAlreadyExistsError extends Error {
	constructor(shortCode: string) {
		super(`Short code "${shortCode}" already exists`);
		this.name = "ShortCodeAlreadyExistsError";
	}
}
