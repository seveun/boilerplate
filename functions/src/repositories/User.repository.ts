import { v4 as uuidv4 } from 'uuid';
import { UserPatch } from '../schemas/User.schema';
import { User } from '@/database/models/User.model';

export const getByFirebaseId = async (firebaseId: string) => {
  const user = await User.findOne({
    where: {
      firebaseId,
    },
  });
  return user;
};

export const create = async (user: UserPatch, firebaseId: string) => {
  const newUser = await User.create({
    ...user,
    firebaseId,
    id: uuidv4(),
    status: 'active',
  });
  return newUser;
};
