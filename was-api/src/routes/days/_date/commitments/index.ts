import { FastifyPluginAsync } from "fastify"
import { AddCommitmentGuestsBody, AddCommitmentGuestsSchema, RemoveCommitmentGuestsBody, RemoveCommitmentGuestsSchema, UpdateCommitmentBody, UpdateCommitmentSchema } from "./schemas";


const commitments: FastifyPluginAsync = async (fastify): Promise<void> => {

  fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));

  // Create/update commitment
  fastify.put<{ Body: UpdateCommitmentBody }>('/', {
    schema: UpdateCommitmentSchema,
  }, async (request, reply) => {
    
    
  });

  // Remove commitment guests
  fastify.delete<{ Body: RemoveCommitmentGuestsBody }>('/', {
    schema: RemoveCommitmentGuestsSchema,
  }, async (request, reply) => {
    
    return "yes";
  });

  // Add commitment guests  
  fastify.post<{ Body: AddCommitmentGuestsBody }>('/', {
    schema: AddCommitmentGuestsSchema,
  }, async (request, reply) => {
    
    return "yes";
  });
};

export default commitments;