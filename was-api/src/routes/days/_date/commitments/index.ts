import { Commitment, CommitmentIds, defaultCommitmentData} from "@models/Commitment";
import { arrayDifference } from "@utils/array";
import { FastifyPluginAsync } from "fastify"
import { AddCommitmentGuestsBody, AddCommitmentGuestsParams, AddCommitmentGuestsQueryString, AddCommitmentGuestsSchema, RemoveCommitmentGuestsBody, RemoveCommitmentGuestsParams, RemoveCommitmentGuestsQueryString, RemoveCommitmentGuestsSchema, UpdateCommitmentBody, UpdateCommitmentParams, UpdateCommitmentQueryString, UpdateCommitmentSchema, GUEST_LIMIT } from "./schemas";

const commitments: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));
  fastify.addHook('preHandler', fastify.auth([fastify.authorizeHouseholdMember]));
  
  // Create/update commitment
  fastify.put<{ Body: UpdateCommitmentBody, Params: UpdateCommitmentParams, Querystring: UpdateCommitmentQueryString }>('', {
    schema: UpdateCommitmentSchema,
  }, async (request, reply) => {

    const commitment = {
      committed: request.body.committed,
      day: request.params.date,
      householdId: request.query.householdId, 
      userId: request.authenticatedUser?.id!
    }

    await fastify.services.commitmentService.upsert(commitment);

    reply.status(200).send();
  });

  // routes prefixed with /guests
  fastify.register(async (fastify) => {

    // Remove commitment guests
    fastify.delete<{ Body: RemoveCommitmentGuestsBody, Params: RemoveCommitmentGuestsParams, Querystring: RemoveCommitmentGuestsQueryString }>('/', {
      schema: RemoveCommitmentGuestsSchema,
    }, async (request, reply) => {

      const commitmentIds = {
        day: request.params.date,
        householdId: request.query.householdId,
        userId: request.authenticatedUser?.id!
      };

      const commitment = await fastify.services.commitmentService.get(commitmentIds);
      if (!commitment) {
        return fastify.httpErrors.notFound("Commitment does not exist");
      }

      const toRemoveGuests = request.body.guests;
      const newGuests = arrayDifference<string>(commitment.guests, toRemoveGuests);

      // Avoid unnecessary query
      if (newGuests.length != commitment.guests.length) {
        await fastify.services.commitmentService.updateGuests(commitmentIds, newGuests);
      }
      reply.status(204).send();
    });

    // Adds new unique guests to commitment or creates a new commitment with those guests
    fastify.put<{ Body: AddCommitmentGuestsBody, Params: AddCommitmentGuestsParams, Querystring: AddCommitmentGuestsQueryString }>('/', {
      schema: AddCommitmentGuestsSchema,
    }, async (request, reply) => {

      const commitmentIds: CommitmentIds = {
        day: request.params.date,
        householdId: request.query.householdId,
        userId: request.authenticatedUser?.id!
      };
      const toAddGuests = request.body.guests;

      const commitment = await fastify.services.commitmentService.get(commitmentIds);

      // Create new commitment if there's no commitment
      if (!commitment) {
        const ToAddGuestsWithoutDuplicates = [...new Set(toAddGuests)];
        await fastify.services.commitmentService.create({
          ...defaultCommitmentData,
          ...commitmentIds,
          guests: ToAddGuestsWithoutDuplicates,
        });

        return reply.status(204).send();
      }

      // Check if max is not exceeded
      if (commitment.guests.length + toAddGuests.length > GUEST_LIMIT) {
        return fastify.httpErrors.notAcceptable("You are trying to add too many guests");
      }

      // Add new guests to the existing commitment
      const newGuests = commitment.guests.concat(toAddGuests);
      const newGuestsWithoutDuplicates = [...new Set(newGuests)];
      await fastify.services.commitmentService.updateGuests(commitmentIds, newGuestsWithoutDuplicates);


      reply.status(204).send();
    });

  }, {prefix: "/guests"});
};

export default commitments;