import { parseISODateNoTime } from "@utils/date";
import { FastifyPluginAsync } from "fastify"
import { AddCommitmentGuestsBody, AddCommitmentGuestsParams, AddCommitmentGuestsQueryString, AddCommitmentGuestsSchema, RemoveCommitmentGuestsBody, RemoveCommitmentGuestsParams, RemoveCommitmentGuestsQueryString, RemoveCommitmentGuestsSchema, UpdateCommitmentBody, UpdateCommitmentParams, UpdateCommitmentQueryString, UpdateCommitmentSchema } from "./schemas";

const commitments: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));

  // Create/update commitment
  fastify.put<{ Body: UpdateCommitmentBody, Params: UpdateCommitmentParams, Querystring: UpdateCommitmentQueryString }>('', {
    schema: UpdateCommitmentSchema,
  }, async (request, reply) => {
    await fastify.services.commitmentService.updateCommitment(
      parseISODateNoTime(request.params.date),
      request.query.householdId,
      request.body.committed,
    );
    reply.status(204).send();
  });

  // routes prefixed with /guests
  fastify.register(async (fastify) => {

    // Remove commitment guests
    fastify.delete<{ Body: RemoveCommitmentGuestsBody, Params: RemoveCommitmentGuestsParams, Querystring: RemoveCommitmentGuestsQueryString }>('/', {
      schema: RemoveCommitmentGuestsSchema,
    }, async (request, reply) => {

      await fastify.services.commitmentService.removeCommitmentGuests(
        parseISODateNoTime(request.params.date),
        request.query.householdId,
        request.body.guests,
      );
      reply.status(204).send();

    });

    // Add commitment guests  
    fastify.put<{ Body: AddCommitmentGuestsBody, Params: AddCommitmentGuestsParams, Querystring: AddCommitmentGuestsQueryString }>('/', {
      schema: AddCommitmentGuestsSchema,
    }, async (request, reply) => {

      await fastify.services.commitmentService.addCommitmentGuests(
        parseISODateNoTime(request.params.date),
        request.query.householdId,
        request.body.guests,
      );
      reply.status(204).send();

    });
  }, {prefix: "/guests"});


};

export default commitments;