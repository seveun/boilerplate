import 'module-alias/register';
import { onRequest } from 'firebase-functions/v2/https';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import bluebird from 'bluebird';
import { initOnlineEnv } from '@/config/Env';
import router from '@/routes';

global.Promise = bluebird as any;

const initEnv = initOnlineEnv();
const app = fastify();
app.register(router);

const fastifyApp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await initEnv;
    await app.ready();
    app.server.emit('request', request, reply);
  } catch (error) {
    console.error('Error initializing environment or starting Fastify app:', error);
    reply.status(500).send('Internal Server Error');
  }
};

export const api = onRequest({
  timeoutSeconds: 12,
  memory: '256MiB',
  region: 'europe-west1',
}, fastifyApp as any);
