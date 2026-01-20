import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { exportLinks } from "../../../app/functions/export-links";

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/links/export",
		{
			schema: {
				summary: "Export all links to CSV",
				description:
					"Generates a CSV report with all links and uploads it to cloud storage",
				tags: ["links"],
				response: {
					200: z.object({
						reportUrl: z.string(),
						fileName: z.string(),
						totalLinks: z.number(),
					}),
					500: z.object({
						message: z.string(),
						code: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const result = await exportLinks();

				return reply.status(200).send(result);
			} catch (error) {
				console.error("Export failed:", error);

				return reply.status(500).send({
					message: "Failed to export links to CSV",
					code: "EXPORT_FAILED",
				});
			}
		},
	);
};
