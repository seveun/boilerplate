import { FastifyInstance } from 'fastify';
import * as HealthCheckController from '@/controllers/HealthCheck.controller';

export default async function healthCheckRoutes(fastify: FastifyInstance) {
  fastify.get('/', HealthCheckController.check);
}
