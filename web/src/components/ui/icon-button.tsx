import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, label, disabled, className = "", ...props }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				aria-label={label}
				title={label}
				className={`
					inline-flex items-center justify-center
					p-2 rounded-md
					text-gray-400
					hover:text-blue-base hover:bg-gray-100
					focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed
					transition-colors duration-200
					${className}
				`}
				{...props}
			>
				{icon}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
