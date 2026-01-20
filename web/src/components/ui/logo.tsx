import { Link } from "@phosphor-icons/react";

interface LogoProps {
	showText?: boolean;
	size?: "sm" | "md" | "lg";
}

const sizes = {
	sm: { icon: 20, text: "text-md" },
	md: { icon: 28, text: "text-lg" },
	lg: { icon: 36, text: "text-xl" },
};

export function Logo({ showText = true, size = "md" }: LogoProps) {
	const { icon, text } = sizes[size];

	return (
		<div className="inline-flex items-center gap-2">
			<div className="relative">
				<Link size={icon} weight="bold" className="text-blue-base" />
				<Link
					size={icon}
					weight="bold"
					className="absolute top-0 left-0 text-blue-base opacity-60 rotate-45"
				/>
			</div>
			{showText && (
				<span className={`${text} font-bold text-blue-base`}>brev.ly</span>
			)}
		</div>
	);
}
