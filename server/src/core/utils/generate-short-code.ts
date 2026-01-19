const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
const DEFAULT_LENGTH = 6;

/**
 * Generates a random short code for URLs
 * Uses lowercase letters and numbers for URL-friendly codes
 */
export function generateShortCode(length: number = DEFAULT_LENGTH): string {
	let result = "";
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);

	for (let i = 0; i < length; i++) {
		result += ALPHABET[randomValues[i] % ALPHABET.length];
	}

	return result;
}
