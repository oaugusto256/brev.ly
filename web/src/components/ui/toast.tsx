import { CheckCircle, Warning, X } from "@phosphor-icons/react";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

type ToastType = "success" | "error";

interface Toast {
	id: string;
	message: string;
	type: ToastType;
}

interface ToastContextData {
	addToast: (message: string, type?: ToastType) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback(
		(message: string, type: ToastType = "success") => {
			const id = crypto.randomUUID();
			const toast: Toast = { id, message, type };

			setToasts((prev) => [...prev, toast]);

			// Auto remove after 4 seconds
			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id));
			}, 4000);
		},
		[],
	);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer toasts={toasts} removeToast={removeToast} />
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

function ToastContainer({
	toasts,
	removeToast,
}: {
	toasts: Toast[];
	removeToast: (id: string) => void;
}) {
	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
			{toasts.map((toast) => (
				<ToastItem
					key={toast.id}
					toast={toast}
					onClose={() => removeToast(toast.id)}
				/>
			))}
		</div>
	);
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
	const isSuccess = toast.type === "success";

	return (
		<div
			className={`
				flex items-center gap-3 p-4 rounded-lg shadow-lg
				animate-in slide-in-from-right-full duration-300
				${isSuccess ? "bg-white border border-gray-200" : "bg-danger/10 border border-danger/30"}
			`}
		>
			{isSuccess ? (
				<CheckCircle
					size={20}
					weight="fill"
					className="text-blue-base flex-shrink-0"
				/>
			) : (
				<Warning
					size={20}
					weight="fill"
					className="text-danger flex-shrink-0"
				/>
			)}
			<p
				className={`text-sm flex-1 ${isSuccess ? "text-gray-600" : "text-danger"}`}
			>
				{toast.message}
			</p>
			<button
				onClick={onClose}
				className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
			>
				<X size={16} />
			</button>
		</div>
	);
}
