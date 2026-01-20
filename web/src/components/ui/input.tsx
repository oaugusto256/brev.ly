import { Warning } from "@phosphor-icons/react";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = "", id, ...props }, ref) => {
		const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
		const hasError = !!error;

		return (
			<div className="flex flex-col gap-2">
				<label
					htmlFor={inputId}
					className={`text-xs-regular ${hasError ? "text-danger" : "text-gray-500"}`}
				>
					{label}
				</label>
				<input
					ref={ref}
					id={inputId}
					className={`
						w-full px-4 py-3
						text-md text-gray-600 placeholder:text-gray-400
						bg-white border rounded-md
						focus:outline-none focus:ring-2 focus:ring-offset-2
						transition-colors duration-200
						${
							hasError
								? "border-danger focus:ring-danger"
								: "border-gray-300 focus:border-blue-base focus:ring-blue-base"
						}
						${className}
					`}
					{...props}
				/>
				{error && (
					<span className="flex items-center gap-1 text-sm text-danger">
						<Warning size={14} weight="fill" />
						{error}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
