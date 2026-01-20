import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, NotFoundPage, RedirectPage } from "./pages";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/:shortCode" element={<RedirectPage />} />
				<Route path="/not-found" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}
