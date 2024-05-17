import { FastifyInstance } from 'fastify';
import healthCheckRoutes from '@/routes/HealthCheck.route';
import userRoutes from '@/routes/User.route';

export default async function router(fastify: FastifyInstance) {
  fastify.register(healthCheckRoutes, { prefix: '/health-check' });
  fastify.register(userRoutes, { prefix: '/user' });
}
