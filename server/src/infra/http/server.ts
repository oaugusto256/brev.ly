import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { resolve } from "node:path";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { exportLinksRoute } from "./routes/export-links";
import { listLinksRoute } from "./routes/list-links";
import { redirectLinkRoute } from "./routes/redirect-link";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Swagger documentation
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly API",
			description: "URL Shortener API",
			version: "1.0.0",
		},
		tags: [{ name: "links", description: "Link management endpoints" }],
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(fastifyCors, {
	origin: "*",
});

// Static file serving for local uploads (development)
app.register(fastifyStatic, {
	root: resolve(process.env.UPLOADS_DIR ?? "./uploads"),
	prefix: "/uploads/",
	decorateReply: false,
});

// Routes
app.register(createLinkRoute);
app.register(deleteLinkRoute);
app.register(exportLinksRoute);
app.register(listLinksRoute);
app.register(redirectLinkRoute);

// Health check
app.get("/health", async () => {
	return { status: "ok" };
});

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
	console.log(`📚 Documentation available at http://localhost:${PORT}/docs`);
});

export { app };
