import { uploadFileLocal } from "./local-storage";
import { uploadFile as uploadFileR2 } from "./r2-storage";

interface UploadFileInput {
	fileName: string;
	contentType: string;
	body: string | Buffer;
}

interface UploadFileOutput {
	url: string;
	fileName: string;
}

const isR2Configured = Boolean(process.env.CLOUDFLARE_ACCOUNT_ID);

console.log(
	`\n🗄️  Storage Selection: ${isR2Configured ? "Cloudflare R2" : "Local Storage"}`,
);
console.log(`   CLOUDFLARE_ACCOUNT_ID present: ${isR2Configured}\n`);

/**
 * Uploads a file to storage
 * Uses Cloudflare R2 if configured, otherwise falls back to local storage
 */
export async function uploadFile(
	input: UploadFileInput,
): Promise<UploadFileOutput> {
	console.log(
		`\n📁 uploadFile called - using: ${isR2Configured ? "R2" : "Local"}`,
	);

	if (isR2Configured) {
		return uploadFileR2(input);
	}

	return uploadFileLocal(input);
}
