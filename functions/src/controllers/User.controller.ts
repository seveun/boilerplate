import { FastifyReply, FastifyRequest } from 'fastify';
import * as UserService from '@/services/User.service';

export const get = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(request.User);
};

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  const { firebaseId } = request.params as { firebaseId: string };
  await UserService.refresh(firebaseId);
  reply.send('OK');
};
