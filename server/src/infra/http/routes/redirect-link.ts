import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getLinkByCode } from "../../../app/functions/get-link-by-code";
import { LinkNotFoundError } from "../../../core/errors";

export const redirectLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/:shortCode",
		{
			schema: {
				summary: "Get original URL from short code",
				tags: ["links"],
				params: z.object({
					shortCode: z.string(),
				}),
				response: {
					200: z.object({
						id: z.string(),
						originalUrl: z.string(),
						shortCode: z.string(),
						accessCount: z.number(),
						createdAt: z.date(),
					}),
					404: z.object({
						message: z.string(),
						code: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { shortCode } = request.params;

			try {
				const link = await getLinkByCode({ shortCode });

				return reply.status(200).send(link);
			} catch (error) {
				if (error instanceof LinkNotFoundError) {
					return reply.status(404).send({
						message: error.message,
						code: "LINK_NOT_FOUND",
					});
				}

				throw error;
			}
		},
	);
};
