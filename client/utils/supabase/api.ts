import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/config.ts';
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from './merged.types';

export default function createClient(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return createServerClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || '',
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );
}