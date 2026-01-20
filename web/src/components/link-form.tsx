import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Card, Input, InputWithPrefix } from "./ui";

const createLinkSchema = z.object({
	originalUrl: z
		.string()
		.min(1, "Informe a URL original")
		.url("Formato de URL inválido"),
	shortCode: z
		.string()
		.min(1, "Informe o código da URL encurtada")
		.regex(/^[a-zA-Z0-9-_]+$/, "Use apenas letras, números, hífen e underline"),
});

type CreateLinkFormData = z.infer<typeof createLinkSchema>;

interface LinkFormProps {
	onSubmit: (data: CreateLinkFormData) => Promise<void>;
	isLoading?: boolean;
}

export function LinkForm({ onSubmit, isLoading }: LinkFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<CreateLinkFormData>({
		resolver: zodResolver(createLinkSchema),
	});

	const originalUrl = watch("originalUrl");
	const shortCode = watch("shortCode");
	const isFormEmpty = !originalUrl || !shortCode;

	const handleFormSubmit = async (data: CreateLinkFormData) => {
		await onSubmit(data);
		reset();
	};

	return (
		<Card className="w-full lg:max-w-[380px]">
			<h2 className="text-lg font-bold text-gray-600 mb-6">Novo link</h2>

			<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
				<Input
					label="LINK ORIGINAL"
					placeholder="www.exemplo.com.br"
					error={errors.originalUrl?.message}
					{...register("originalUrl")}
				/>

				<InputWithPrefix
					label="LINK ENCURTADO"
					prefix="brev.ly/"
					placeholder=""
					error={errors.shortCode?.message}
					{...register("shortCode")}
				/>

				<Button
					type="submit"
					isLoading={isLoading}
					disabled={isFormEmpty}
					className="mt-2"
				>
					Salvar link
				</Button>
			</form>
		</Card>
	);
}
