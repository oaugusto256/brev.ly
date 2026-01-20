import { Link } from "@phosphor-icons/react";

interface EmptyStateProps {
	message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-4">
			<Link size={32} weight="duotone" className="text-gray-300 mb-3" />
			<p className="text-xs-regular text-gray-400 text-center">{message}</p>
		</div>
	);
}
