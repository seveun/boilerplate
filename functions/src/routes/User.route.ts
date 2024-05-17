import { FastifyInstance } from 'fastify';
import * as UserController from '@/controllers/User.controller';
import { authRequired } from '@/middlewares/auth.middleware';

export default async function healthCheckRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: authRequired }, UserController.get);
  fastify.get('/refresh/:firebaseId', UserController.refresh);
}
