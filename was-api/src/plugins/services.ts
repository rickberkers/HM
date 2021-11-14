import fp from 'fastify-plugin'

import DayService from '../services/DayService';
import UserService from '../services/UserService';

import { IDayService } from '../services/IDayService';
import { IUserService } from '../services/IUserService';

declare module 'fastify' {
    export interface FastifyInstance {
        services: projectServices;
    }
}

interface projectServices {
    dayService: IDayService
    userService: IUserService
}

/**
 * This plugins adds services
 */
export default fp(async (fastify) => {
    fastify.decorate<projectServices>('services', {
        dayService: new DayService(fastify.orm),
        userService: new UserService(fastify.orm),
    });
});