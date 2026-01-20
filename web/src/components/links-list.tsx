import { DownloadSimple } from "@phosphor-icons/react";
import type { Link } from "../types";
import { EmptyState } from "./empty-state";
import { LinkItem } from "./link-item";
import { Button, Card } from "./ui";

interface LinksListProps {
	links: Link[];
	isLoading?: boolean;
	onCopy: (link: Link) => void;
	onDelete: (link: Link) => void;
	onLinkClick: (link: Link) => void;
	onExportCsv: () => void;
	isExporting?: boolean;
}

export function LinksList({
	links,
	isLoading,
	onCopy,
	onDelete,
	onLinkClick,
	onExportCsv,
	isExporting,
}: LinksListProps) {
	const hasLinks = links.length > 0;

	return (
		<Card className="w-full flex-1 flex flex-col min-h-[300px]">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-gray-600">Meus links</h2>
				<Button
					variant="secondary"
					onClick={onExportCsv}
					disabled={!hasLinks || isExporting}
					isLoading={isExporting}
				>
					<DownloadSimple size={16} />
					Baixar CSV
				</Button>
			</div>

			<div className="flex-1 border-t border-gray-200">
				{isLoading ? (
					<div className="flex items-center justify-center py-12">
						<span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-base border-r-transparent" />
					</div>
				) : hasLinks ? (
					<div className="divide-y divide-gray-200">
						{links.map((link) => (
							<LinkItem
								key={link.id}
								link={link}
								onCopy={onCopy}
								onDelete={onDelete}
								onLinkClick={onLinkClick}
							/>
						))}
					</div>
				) : (
					<EmptyState message="AINDA NÃO EXISTEM LINKS CADASTRADOS" />
				)}
			</div>
		</Card>
	);
}
