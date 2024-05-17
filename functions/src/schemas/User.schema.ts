import z from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  firebaseId: z.string().uuid(),
  email: z.string().email().nullable(),
  username: z.string().nullable(),
  image: z.string().nullable(),
  emailVerified: z.boolean().optional(),
  status: z.enum(['active', 'ban', 'disabled']),
});

export const UserPatchSchema = UserSchema.partial();

export type UserPatch = z.infer<typeof UserPatchSchema>;

export type User = z.infer<typeof UserSchema>;
