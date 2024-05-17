import bluebird from 'bluebird';
import 'fastify';
import User from '@/schemas/User.schema';

declare global {
    interface PromiseConstructor {
      each: typeof bluebird.each;
      map: typeof bluebird.map;
      delay: typeof bluebird.delay;
    }
}

declare module 'fastify' {
  interface FastifyRequest {
    User?: User
  }
}
