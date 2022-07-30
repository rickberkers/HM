import { FastifyRequest } from 'fastify';
import fp from 'fastify-plugin'

/**
 * This plugins adds authorization methods
 */
export default fp(async (fastify, opts) => {

    /**
     *  Ensures authenticated user is member of accessed household
     */
    const authorizeHouseholdMember = async (request: FastifyRequest) => {
        const notAuthorizedError = fastify.httpErrors.unauthorized("not authorized");
        type householdIdType = {householdId: string};

        if (!request || !request.authenticatedUser) {
            throw notAuthorizedError;
        }

        let requestHouseholdId = undefined;
        requestHouseholdId = (request.body as householdIdType | undefined)?.householdId ?? requestHouseholdId;
        requestHouseholdId = (request.params as householdIdType | undefined)?.householdId ?? requestHouseholdId;
        requestHouseholdId = (request.query as householdIdType | undefined)?.householdId ?? requestHouseholdId;
        if (!requestHouseholdId) {
            throw notAuthorizedError;
        }

        const userIsHouseholdMember = await fastify.services.householdService.householdMemberRelationExists(requestHouseholdId, request.authenticatedUser.id);
        if (!userIsHouseholdMember){
            throw notAuthorizedError;
        }
    }

    fastify.decorate("authorizeHouseholdMember", authorizeHouseholdMember);
});

declare module 'fastify' {
    export interface FastifyInstance {
        authorizeHouseholdMember(request: FastifyRequest): Promise<void>;
    }
}