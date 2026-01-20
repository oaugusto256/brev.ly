import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { listLinks } from "../../../app/functions/list-links";

export const listLinksRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/links",
		{
			schema: {
				summary: "List all links",
				tags: ["links"],
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							originalUrl: z.string(),
							shortCode: z.string(),
							shortUrl: z.string(),
							accessCount: z.number(),
							createdAt: z.date(),
						}),
					),
				},
			},
		},
		async (request, reply) => {
			const links = await listLinks();

			return reply.status(200).send(links);
		},
	);
};
