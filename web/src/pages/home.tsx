import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { LinkForm, LinksList, Logo, useToast } from "../components";
import {
	useCreateLink,
	useDeleteLink,
	useExportLinks,
	useLinks,
} from "../hooks";
import type { Link } from "../types";

export function HomePage() {
	const [error, setError] = useState<string | null>(null);
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	const { data: links = [], isLoading } = useLinks();
	const createLink = useCreateLink();
	const deleteLink = useDeleteLink();
	const exportLinks = useExportLinks();

	const handleCreateLink = async (data: {
		originalUrl: string;
		shortCode: string;
	}) => {
		setError(null);
		try {
			await createLink.mutateAsync(data);
			addToast("Link criado com sucesso!");
		} catch (err) {
			if (isAxiosError(err)) {
				const message =
					err.response?.data?.message || "Erro ao criar link. Tente novamente.";
				setError(message);
			}
			throw err;
		}
	};

	const handleCopyLink = async (link: Link) => {
		const baseUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
		const url = `${baseUrl}/${link.shortCode}`;
		await navigator.clipboard.writeText(url);
		addToast("Link copiado para a área de transferência!");
	};

	const handleDeleteLink = async (link: Link) => {
		await deleteLink.mutateAsync(link.id);
		addToast("Link excluído com sucesso!");
	};

	const handleLinkClick = (link: Link) => {
		// Optimistic update: increment access count immediately
		queryClient.setQueryData<Link[]>(["links"], (oldLinks) => {
			if (!oldLinks) return oldLinks;
			return oldLinks.map((l) =>
				l.id === link.id ? { ...l, accessCount: l.accessCount + 1 } : l,
			);
		});

		// Note: The actual increment happens on the backend when the redirect page
		// fetches the original URL. If there's an error on that page, the count
		// will be corrected on the next refetch.
	};

	const handleExportCsv = () => {
		exportLinks.mutate(undefined, {
			onSuccess: () => {
				addToast("Relatório CSV exportado com sucesso!");
			},
			onError: () => {
				addToast("Erro ao exportar CSV. Tente novamente.", "error");
			},
		});
	};

	return (
		<div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<header className="mb-8 text-center md:text-left">
					<Logo size="md" />
				</header>

				{/* Error message */}
				{error && (
					<div className="w-full mb-4 p-4 bg-danger/10 border border-danger/30 rounded-md text-danger text-sm">
						{error}
					</div>
				)}

				{/* Main content */}
				<main className="flex flex-col lg:flex-row gap-6 lg:items-start">
					<LinkForm
						onSubmit={handleCreateLink}
						isLoading={createLink.isPending}
					/>

					<LinksList
						links={links}
						isLoading={isLoading}
						onCopy={handleCopyLink}
						onDelete={handleDeleteLink}
						onLinkClick={handleLinkClick}
						onExportCsv={handleExportCsv}
						isExporting={exportLinks.isPending}
					/>
				</main>
			</div>
		</div>
	);
}
