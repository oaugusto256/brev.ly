import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Logo } from "../components";
import { getLinkByShortCode } from "../services";

export function RedirectPage() {
	const { shortCode } = useParams<{ shortCode: string }>();
	const navigate = useNavigate();
	const [originalUrl, setOriginalUrl] = useState<string | null>(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		// Prevent double fetch in React StrictMode
		if (hasFetched.current) return;

		if (!shortCode) {
			navigate("/not-found", { replace: true });
			return;
		}

		hasFetched.current = true;

		const fetchAndRedirect = async () => {
			try {
				const { originalUrl } = await getLinkByShortCode(shortCode);
				setOriginalUrl(originalUrl);

				// Redirect after a short delay
				setTimeout(() => {
					window.location.href = originalUrl;
				}, 1500);
			} catch {
				navigate("/not-found", { replace: true });
			}
		};

		fetchAndRedirect();
	}, [shortCode, navigate]);

	return (
		<div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
			<Card className="w-full max-w-[580px] py-12 px-8 text-center">
				<div className="flex justify-center mb-6">
					<Logo showText={false} size="lg" />
				</div>

				<h1 className="text-xl font-bold text-gray-600 mb-4">
					Redirecionando...
				</h1>

				<p className="text-md text-gray-500">
					O link será aberto automaticamente em alguns instantes.
				</p>
				<p className="text-md text-gray-500">
					Não foi redirecionado?{" "}
					{originalUrl ? (
						<a
							href={originalUrl}
							className="text-blue-base hover:underline font-semibold"
						>
							Acesse aqui
						</a>
					) : (
						<span className="text-gray-400">Acesse aqui</span>
					)}
				</p>
			</Card>
		</div>
	);
}
