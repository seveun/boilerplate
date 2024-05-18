import 'fastify';
import User from '@/schemas/User.schema';

declare module 'fastify' {
  interface FastifyRequest {
    User?: User
  }
}
