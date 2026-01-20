import { isAxiosError } from "axios";
import { useState } from "react";
import { LinkForm, LinksList, Logo } from "../components";
import {
	useCreateLink,
	useDeleteLink,
	useExportLinks,
	useLinks,
} from "../hooks";
import type { Link } from "../types";

export function HomePage() {
	const [error, setError] = useState<string | null>(null);

	const { data: links = [], isLoading } = useLinks();
	console.log(links);

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
		const url = `${import.meta.env.VITE_FRONTEND_URL}/${link.shortCode}`;
		await navigator.clipboard.writeText(url);
	};

	const handleDeleteLink = async (link: Link) => {
		await deleteLink.mutateAsync(link.id);
	};

	const handleExportCsv = () => {
		exportLinks.mutate();
	};

	return (
		<div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<header className="mb-8">
					<Logo size="md" />
				</header>

				{/* Error message */}
				{error && (
					<div className="mb-4 p-4 bg-danger/10 border border-danger/30 rounded-md text-danger text-sm w-full">
						{error}
					</div>
				)}

				{/* Main content */}
				<main className="flex flex-col lg:flex-row gap-6 items-start">
					<LinkForm
						onSubmit={handleCreateLink}
						isLoading={createLink.isPending}
					/>

					<LinksList
						links={links}
						isLoading={isLoading}
						onCopy={handleCopyLink}
						onDelete={handleDeleteLink}
						onExportCsv={handleExportCsv}
						isExporting={exportLinks.isPending}
					/>
				</main>
			</div>
		</div>
	);
}
