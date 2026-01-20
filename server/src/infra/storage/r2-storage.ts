import {
	PutObjectCommand,
	type PutObjectCommandInput,
	S3Client,
} from "@aws-sdk/client-s3";

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const CLOUDFLARE_ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID ?? "";
const CLOUDFLARE_SECRET_ACCESS_KEY =
	process.env.CLOUDFLARE_SECRET_ACCESS_KEY ?? "";
const CLOUDFLARE_BUCKET_NAME = process.env.CLOUDFLARE_BUCKET;
const CLOUDFLARE_PUBLIC_URL = process.env.CLOUDFLARE_PUBLIC_URL ?? "";

// Debug: Log configuration on startup
console.log("🔧 R2 Storage Configuration:");
console.log(
	`   CLOUDFLARE_ACCOUNT_ID: ${CLOUDFLARE_ACCOUNT_ID ? `${CLOUDFLARE_ACCOUNT_ID.slice(0, 8)}...` : "❌ NOT SET"}`,
);
console.log(
	`   CLOUDFLARE_ACCESS_KEY_ID: ${CLOUDFLARE_ACCESS_KEY_ID ? `${CLOUDFLARE_ACCESS_KEY_ID.slice(0, 8)}...` : "❌ NOT SET"}`,
);
console.log(
	`   CLOUDFLARE_SECRET_ACCESS_KEY: ${CLOUDFLARE_SECRET_ACCESS_KEY ? "✅ SET (hidden)" : "❌ NOT SET"}`,
);
console.log(`   CLOUDFLARE_BUCKET_NAME: ${CLOUDFLARE_BUCKET_NAME}`);
console.log(
	`   CLOUDFLARE_PUBLIC_URL: ${CLOUDFLARE_PUBLIC_URL || "❌ NOT SET"}`,
);
console.log(
	`   R2 Endpoint: https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
);

const r2Client = new S3Client({
	region: "auto",
	endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});

interface UploadFileInput {
	fileName: string;
	contentType: string;
	body: string | Buffer;
}

interface UploadFileOutput {
	url: string;
	fileName: string;
}

export async function uploadFile(
	input: UploadFileInput,
): Promise<UploadFileOutput> {
	const { fileName, contentType, body } = input;

	console.log("\n📤 R2 Upload Started:");
	console.log(`   File: ${fileName}`);
	console.log(`   Content-Type: ${contentType}`);
	console.log(
		`   Body size: ${typeof body === "string" ? body.length : body.byteLength} bytes`,
	);

	const params: PutObjectCommandInput = {
		Bucket: CLOUDFLARE_BUCKET_NAME,
		Key: fileName,
		Body: body,
		ContentType: contentType,
	};

	console.log(`   Bucket: ${params.Bucket}`);
	console.log(`   Key: ${params.Key}`);

	try {
		console.log("   Sending to R2...");
		const response = await r2Client.send(new PutObjectCommand(params));
		console.log("   ✅ Upload successful!");
		console.log(`   ETag: ${response.ETag}`);

		const url = `${CLOUDFLARE_PUBLIC_URL}/${fileName}`;
		console.log(`   Public URL: ${url}`);

		return {
			url,
			fileName,
		};
	} catch (error) {
		console.error("   ❌ Upload failed!");
		console.error("   Error:", error);
		throw error;
	}
}
