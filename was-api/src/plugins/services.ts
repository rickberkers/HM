import fp from 'fastify-plugin'

import DayService from '@services/DayService';
import UserService from '@services/UserService';

import { IDayService } from '@services/IDayService';
import { IUserService } from '@services/IUserService';
import { IHouseholdService } from '@services/IHouseholdService';
import HouseholdService from '@services/HouseholdService';
import CommitmentService from '@services/CommitmentService';
import { ICommitmentService } from '@services/ICommitmentService';

declare module 'fastify' {
    export interface FastifyInstance {
        services: projectServices;
    }
}

interface projectServices {
    dayService: IDayService
    userService: IUserService
    householdService: IHouseholdService
    commitmentService: ICommitmentService
}

/**
 * This plugins adds services
 */
export default fp(async (fastify) => {
    fastify.decorate<projectServices>('services', {
        dayService: new DayService(fastify.orm),
        userService: new UserService(fastify.orm),
        householdService: new HouseholdService(fastify.orm),
        commitmentService: new CommitmentService(fastify.orm),
    });
});