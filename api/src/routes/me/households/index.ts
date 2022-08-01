import { FastifyPluginAsync } from "fastify";

const households: FastifyPluginAsync = async (fastify): Promise<void> => {
  
    fastify.addHook('preValidation', fastify.auth([fastify.verifyAccessToken]));
    
    /**
     * Households that belong to authenticated user
     */
    fastify.get('/', async (request, reply) => {
        const user = request.authenticatedUser!;
        return await fastify.services.householdService.getHouseholdsByMemberId(user.id);
    });
}

export default households;