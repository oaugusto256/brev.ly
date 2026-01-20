import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? "./uploads";
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3333";

interface UploadFileInput {
	fileName: string;
	contentType: string;
	body: string | Buffer;
}

interface UploadFileOutput {
	url: string;
	fileName: string;
}

export async function uploadFileLocal(
	input: UploadFileInput,
): Promise<UploadFileOutput> {
	const { fileName, body } = input;

	const filePath = join(UPLOADS_DIR, fileName);
	const dir = dirname(filePath);

	// Ensure directory exists
	await mkdir(dir, { recursive: true });

	// Write file
	await writeFile(filePath, body);

	const url = `${BASE_URL}/uploads/${fileName}`;

	return {
		url,
		fileName,
	};
}
