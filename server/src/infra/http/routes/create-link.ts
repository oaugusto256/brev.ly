import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createLink } from "../../../app/functions/create-link";
import {
	InvalidShortCodeError,
	InvalidUrlError,
	ShortCodeAlreadyExistsError,
} from "../../../core/errors";

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/links",
		{
			schema: {
				summary: "Create a new shortened link",
				tags: ["links"],
				body: z.object({
					originalUrl: z.string().url("Invalid URL format"),
					shortCode: z
						.string()
						.min(3, "Short code must be at least 3 characters")
						.max(20, "Short code must be at most 20 characters")
						.regex(
							/^[a-z0-9-]+$/,
							"Short code must contain only lowercase letters, numbers, and hyphens",
						)
						.optional(),
				}),
				response: {
					201: z.object({
						id: z.string(),
						originalUrl: z.string(),
						shortCode: z.string(),
						shortUrl: z.string(),
						createdAt: z.date(),
					}),
					400: z.object({
						message: z.string(),
						code: z.string(),
					}),
					409: z.object({
						message: z.string(),
						code: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortCode } = request.body;

			try {
				const link = await createLink({ originalUrl, shortCode });

				return reply.status(201).send(link);
			} catch (error) {
				if (error instanceof InvalidUrlError) {
					return reply.status(400).send({
						message: error.message,
						code: "INVALID_URL",
					});
				}

				if (error instanceof InvalidShortCodeError) {
					return reply.status(400).send({
						message: error.message,
						code: "INVALID_SHORT_CODE",
					});
				}

				if (error instanceof ShortCodeAlreadyExistsError) {
					return reply.status(409).send({
						message: error.message,
						code: "SHORT_CODE_ALREADY_EXISTS",
					});
				}

				throw error;
			}
		},
	);
};
