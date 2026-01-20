import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteLink } from "../../../app/functions/delete-link";
import { LinkNotFoundError } from "../../../core/errors";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete a link",
				tags: ["links"],
				params: z.object({
					id: z.string(),
				}),
				response: {
					204: z.null().describe("Link deleted successfully"),
					404: z.object({
						message: z.string(),
						code: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			try {
				await deleteLink({ id });

				return reply.status(204).send();
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
