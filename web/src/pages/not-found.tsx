import { Link } from "react-router-dom";
import { Card, Glitch404 } from "../components";

export function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
			<Card className="w-full max-w-[580px] py-12 px-8 text-center">
				<div className="flex justify-center mb-6">
					<Glitch404 />
				</div>

				<h1 className="text-lg font-bold text-gray-600 mb-4">
					Link não encontrado
				</h1>

				<p className="text-md text-gray-500">
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em{" "}
					<Link to="/" className="text-blue-base hover:underline font-semibold">
						brev.ly
					</Link>
					.
				</p>
			</Card>
		</div>
	);
}
