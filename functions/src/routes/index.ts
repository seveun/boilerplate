import { FastifyInstance } from 'fastify';
import healthCheckRoutes from '@/routes/HealthCheck.route';

export default async function router(fastify: FastifyInstance) {
  fastify.register(healthCheckRoutes, { prefix: '/health-check' });
}
