import { z } from 'zod';

export const UserInfosSchema = z.object({
  first_name: z.string().min(2).max(32).optional(),
  last_name: z.string().min(2).max(32).optional(),
  username: z.string().min(2).max(32).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(2).max(32).optional(),
  ghost_mode: z.boolean().optional(),
  hide_stats: z.boolean().optional(),
  marketing_consent: z.boolean().optional(),
  postal_address: z
    .object({
      country: z.string().min(2).max(32),
      state: z.string().min(2).max(32),
      city: z.string().min(2).max(32),
      zip_code: z.string().min(2).max(32),
      address: z.string().min(2).max(32),
    })
    .optional(),
});

export type UserInfos = z.infer<typeof UserInfosSchema>;
