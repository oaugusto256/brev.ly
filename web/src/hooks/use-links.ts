import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createLink,
	deleteLink,
	exportLinksToCsv,
	getLinks,
} from "../services";
import type { CreateLinkInput } from "../types";

const LINKS_QUERY_KEY = ["links"];

export function useLinks() {
	return useQuery({
		queryKey: LINKS_QUERY_KEY,
		queryFn: getLinks,
	});
}

export function useCreateLink() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateLinkInput) => createLink(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
		},
	});
}

export function useDeleteLink() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
		},
	});
}

export function useExportLinks() {
	return useMutation({
		mutationFn: exportLinksToCsv,
		onSuccess: (url) => {
			// Open the CSV download in a new tab
			window.open(url, "_blank");
		},
	});
}
