import { Warning } from "@phosphor-icons/react";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputWithPrefixProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	prefix: string;
	error?: string;
}

export const InputWithPrefix = forwardRef<
	HTMLInputElement,
	InputWithPrefixProps
>(({ label, prefix, error, className = "", id, ...props }, ref) => {
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
			<div
				className={`
						flex items-center w-full
						bg-white border rounded-md
						focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
						transition-colors duration-200
						${
							hasError
								? "border-danger focus-within:ring-danger"
								: "border-gray-300 focus-within:border-blue-base focus-within:ring-blue-base"
						}
					`}
			>
				<span className="pl-4 text-md text-gray-400 select-none">{prefix}</span>
				<input
					ref={ref}
					id={inputId}
					className={`
							flex-1 py-3 pr-4 pl-0
							text-md text-gray-600 placeholder:text-gray-400
							bg-transparent border-none
							focus:outline-none
							${className}
						`}
					{...props}
				/>
			</div>
			{error && (
				<span className="flex items-center gap-1 text-sm text-danger">
					<Warning size={14} weight="fill" />
					{error}
				</span>
			)}
		</div>
	);
});

InputWithPrefix.displayName = "InputWithPrefix";
