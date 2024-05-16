import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  GCP_PROJECT_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;
