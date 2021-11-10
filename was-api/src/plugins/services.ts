import fp from 'fastify-plugin'
import DayService from '../services/DayService';
import { IDayService } from '../services/IDayService';

declare module 'fastify' {
    export interface FastifyInstance {
        services: projectServices;
    }
}

interface projectServices {
    dayService: IDayService
}

/**
 * This plugins adds a service
 */
export default fp(async (fastify) => {
    fastify.decorate<projectServices>('services', {
        dayService: new DayService(fastify.orm),
    });
});