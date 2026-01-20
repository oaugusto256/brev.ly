export interface Link {
	id: string;
	originalUrl: string;
	shortCode: string;
	accessCount: number;
	createdAt: string;
}

export interface CreateLinkInput {
	originalUrl: string;
	shortCode?: string;
}

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
}
