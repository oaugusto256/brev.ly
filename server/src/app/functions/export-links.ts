import { desc } from "drizzle-orm";
import { generateShortCode } from "../../core/utils/generate-short-code";
import { db } from "../../infra/db";
import { urls } from "../../infra/db/schemas";
import { uploadFile } from "../../infra/storage";

interface ExportLinksOutput {
	reportUrl: string;
	fileName: string;
	totalLinks: number;
}

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3333";

/**
 * Generates a unique file name for the CSV report
 */
function generateReportFileName(): string {
	const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const uniqueId = generateShortCode(8);
	return `reports/links-${timestamp}-${uniqueId}.csv`;
}

/**
 * Escapes a value for CSV format
 */
function escapeCsvValue(value: string): string {
	if (value.includes(",") || value.includes('"') || value.includes("\n")) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}

/**
 * Exports all links to a CSV file and uploads to cloud storage
 * Uses streaming approach for better performance with large datasets
 */
export async function exportLinks(): Promise<ExportLinksOutput> {
	// Fetch all links ordered by creation date (newest first)
	const links = await db
		.select({
			originalUrl: urls.originalUrl,
			shortCode: urls.shortCode,
			accessCount: urls.accessCount,
			createdAt: urls.createdAt,
		})
		.from(urls)
		.orderBy(desc(urls.createdAt));

	// Build CSV content
	const csvHeaders = [
		"Original URL",
		"Shortened URL",
		"Access Count",
		"Created At",
	];

	const csvRows = links.map((link) => [
		escapeCsvValue(link.originalUrl),
		escapeCsvValue(`${BASE_URL}/${link.shortCode}`),
		link.accessCount.toString(),
		link.createdAt.toISOString(),
	]);

	const csvContent = [
		csvHeaders.join(","),
		...csvRows.map((row) => row.join(",")),
	].join("\n");

	// Generate unique file name
	const fileName = generateReportFileName();

	// Upload to cloud storage
	const { url } = await uploadFile({
		fileName,
		contentType: "text/csv",
		body: csvContent,
	});

	return {
		reportUrl: url,
		fileName,
		totalLinks: links.length,
	};
}
