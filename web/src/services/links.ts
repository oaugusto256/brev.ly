import type { CreateLinkInput, Link } from "../types";
import { api } from "./api";

export async function getLinks(): Promise<Link[]> {
	const response = await api.get<Link[]>("/links");
	return response.data;
}

export async function getLinkByShortCode(
	shortCode: string,
): Promise<{ originalUrl: string }> {
	const response = await api.get<{ originalUrl: string }>(`/${shortCode}`);
	return response.data;
}

export async function createLink(data: CreateLinkInput): Promise<Link> {
	const response = await api.post<{ link: Link }>("/links", data);
	return response.data.link;
}

export async function deleteLink(id: string): Promise<void> {
	await api.delete(`/links/${id}`);
}

export async function exportLinksToCsv(): Promise<string> {
	const response = await api.post<{ reportUrl: string }>("/links/export");
	return response.data.reportUrl;
}
