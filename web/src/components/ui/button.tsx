import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			isLoading,
			disabled,
			className = "",
			children,
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || isLoading;

		const baseStyles =
			"inline-flex items-center justify-center gap-2 font-semibold text-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2 disabled:cursor-not-allowed";

		const variants: Record<ButtonVariant, string> = {
			primary: `
				px-6 py-3 rounded-md w-full
				bg-blue-base text-white
				hover:bg-blue-dark
				disabled:bg-blue-base/60 disabled:text-white/60
			`,
			secondary: `
				px-4 py-2 rounded-md border border-gray-300 bg-white
				text-gray-500
				hover:border-blue-base hover:text-blue-base
				disabled:opacity-50
			`,
		};

		return (
			<button
				ref={ref}
				disabled={isDisabled}
				className={`${baseStyles} ${variants[variant]} ${className}`}
				{...props}
			>
				{isLoading ? (
					<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
				) : (
					children
				)}
			</button>
		);
	},
);

Button.displayName = "Button";
