import * as UserRepository from '@/repositories/User.repository';
import { UserPatch } from '@/schemas/User.schema';
import firebaseAdmin from '../config/FirebaseAdmin';

export const getByFirebaseId = async (firebaseId: string) => {
  const user = await UserRepository.getByFirebaseId(firebaseId);
  return user;
};

export const create = async (user: UserPatch, firebaseId: string) => {
  const newUser = await UserRepository.create(user, firebaseId);
  return newUser;
};

export const refresh = async (firebaseId: string) => {
  const db = firebaseAdmin.database();
  const userRef = db.ref(`users/${firebaseId}`);
  await userRef.update({ updatedAt: Date.now() });
  return 'OK';
};
