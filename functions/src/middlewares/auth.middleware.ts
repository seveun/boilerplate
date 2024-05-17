import { FastifyReply, FastifyRequest } from 'fastify';
import firebaseAdmin from '@/config/FirebaseAdmin';
import * as UserService from '@/services/User.service';
import { UnauthorizedError, ForbiddenError } from '@/utils/Error';

export const authRequired = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    UnauthorizedError(reply, request, 'Auth token is not found');
    return;
  }
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const decodedUser = await firebaseAdmin.auth().getUser(decodedToken.uid);
    let user = await UserService.getByFirebaseId(decodedUser.uid);
    if (!user) {
      user = await UserService.create({
        email: decodedUser?.email || decodedUser?.providerData?.[0]?.email || null,
        username: decodedUser?.displayName || null,
        image: decodedUser.photoURL,
        emailVerified: decodedUser.emailVerified,
      }, decodedUser.uid);
    }
    if (!user) ForbiddenError(reply, request, 'User is not found');
    else if (user.status === 'ban') ForbiddenError(reply, request, 'User is banned');
    else if (user.status === 'disabled') ForbiddenError(reply, request, 'User is disabled');
    if (!user || user.status === 'ban' || user.status === 'disabled') return;
    request.User = user;
  } catch (error) {
    console.error('Error verifying token:', error);
    ForbiddenError(reply, request, 'Unauthorized');
  }
};
