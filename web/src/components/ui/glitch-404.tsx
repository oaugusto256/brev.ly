export function Glitch404() {
	return (
		<div className="relative select-none">
			<span
				className="text-[80px] font-bold text-blue-base leading-none tracking-wider"
				style={{
					textShadow: `
						2px 0 #B12C4D,
						-2px 0 #2C46B1,
						4px 2px #B12C4D,
						-4px -2px #2C46B1
					`,
				}}
			>
				404
			</span>
			{/* Glitch layers */}
			<span
				aria-hidden="true"
				className="absolute top-0 left-0 text-[80px] font-bold leading-none tracking-wider text-transparent animate-pulse"
				style={{
					WebkitTextStroke: "1px #B12C4D",
					clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
					transform: "translate(-3px, 0)",
				}}
			>
				404
			</span>
			<span
				aria-hidden="true"
				className="absolute top-0 left-0 text-[80px] font-bold leading-none tracking-wider text-transparent animate-pulse"
				style={{
					WebkitTextStroke: "1px #2C46B1",
					clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
					transform: "translate(3px, 0)",
					animationDelay: "0.1s",
				}}
			>
				404
			</span>
		</div>
	);
}
