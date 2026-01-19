export class InvalidShortCodeError extends Error {
	constructor(shortCode: string) {
		super(
			`Short code "${shortCode}" is invalid. It must contain only lowercase letters, numbers, and hyphens, and be between 3-20 characters.`,
		);
		this.name = "InvalidShortCodeError";
	}
}
