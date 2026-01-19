import { eq } from "drizzle-orm";
import {
	InvalidShortCodeError,
	InvalidUrlError,
	ShortCodeAlreadyExistsError,
} from "../../core/errors";
import { generateShortCode } from "../../core/utils/generate-short-code";
import { db } from "../../infra/db";
import { urls } from "../../infra/db/schemas";

interface CreateLinkInput {
	originalUrl: string;
	shortCode?: string; // Optional - will be auto-generated if not provided
}

interface CreateLinkOutput {
	id: string;
	originalUrl: string;
	shortCode: string;
	shortUrl: string;
	createdAt: Date;
}

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3333";

/**
 * Validates if the short code format is correct
 * Rules: lowercase letters, numbers, and hyphens only, 3-20 characters
 */
function isValidShortCode(shortCode: string): boolean {
	const shortCodeRegex = /^[a-z0-9-]{3,20}$/;
	return shortCodeRegex.test(shortCode);
}

/**
 * Validates if the URL is a valid HTTP/HTTPS URL
 */
function isValidUrl(url: string): boolean {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
	} catch {
		return false;
	}
}

/**
 * Generates a unique short code, retrying if collision occurs
 */
async function generateUniqueShortCode(maxRetries = 5): Promise<string> {
	for (let i = 0; i < maxRetries; i++) {
		const code = generateShortCode();

		const existing = await db
			.select({ id: urls.id })
			.from(urls)
			.where(eq(urls.shortCode, code))
			.limit(1);

		if (existing.length === 0) {
			return code;
		}
	}

	throw new Error(
		"Failed to generate unique short code after multiple attempts",
	);
}

export async function createLink(
	input: CreateLinkInput,
): Promise<CreateLinkOutput> {
	const { originalUrl, shortCode: providedShortCode } = input;

	// Validate original URL format
	if (!isValidUrl(originalUrl)) {
		throw new InvalidUrlError(originalUrl);
	}

	let shortCode: string;

	if (providedShortCode) {
		// User provided a custom short code - validate it
		if (!isValidShortCode(providedShortCode)) {
			throw new InvalidShortCodeError(providedShortCode);
		}

		// Check if short code already exists
		const existingUrl = await db
			.select({ id: urls.id })
			.from(urls)
			.where(eq(urls.shortCode, providedShortCode))
			.limit(1);

		if (existingUrl.length > 0) {
			throw new ShortCodeAlreadyExistsError(providedShortCode);
		}

		shortCode = providedShortCode;
	} else {
		// Auto-generate a unique short code
		shortCode = await generateUniqueShortCode();
	}

	// Create the new link
	const [newUrl] = await db
		.insert(urls)
		.values({
			originalUrl,
			shortCode,
		})
		.returning({
			id: urls.id,
			originalUrl: urls.originalUrl,
			shortCode: urls.shortCode,
			createdAt: urls.createdAt,
		});

	return {
		...newUrl,
		shortUrl: `${BASE_URL}/${newUrl.shortCode}`,
	};
}
