import { Copy, Trash } from "@phosphor-icons/react";
import type { Link } from "../types";
import { IconButton } from "./ui";

interface LinkItemProps {
	link: Link;
	onCopy: (link: Link) => void;
	onDelete: (link: Link) => void;
	onLinkClick: (link: Link) => void;
}

export function LinkItem({
	link,
	onCopy,
	onDelete,
	onLinkClick,
}: LinkItemProps) {
	const shortUrl = `brev.ly/${link.shortCode}`;

	const handleLinkClick = () => {
		onLinkClick(link);
	};

	return (
		<div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100/50 transition-colors">
			<div className="flex-1 min-w-0 mr-4">
				<a
					href={`${import.meta.env.VITE_FRONTEND_URL || window.location.origin}/${link.shortCode}`}
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleLinkClick}
					className="block text-md font-semibold text-blue-base hover:underline truncate max-w-[400px]"
				>
					{shortUrl}
				</a>
				<p className="text-sm text-gray-400 truncate max-w-[400px]">
					{link.originalUrl}
				</p>
			</div>

			<div className="flex items-center gap-1">
				<span className="text-sm text-gray-400 mr-2">
					{link.accessCount} {link.accessCount === 1 ? "acesso" : "acessos"}
				</span>
				<IconButton
					icon={<Copy size={16} />}
					label="Copiar link"
					onClick={() => onCopy(link)}
				/>
				<IconButton
					icon={<Trash size={16} />}
					label="Excluir link"
					onClick={() => onDelete(link)}
				/>
			</div>
		</div>
	);
}
