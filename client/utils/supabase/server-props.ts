import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/config.ts';
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import { type GetServerSidePropsContext } from 'next';

export function createClient({ req, res }: GetServerSidePropsContext) {
  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req
            ? Object.keys(req.cookies).map((name) => ({
                name,
                value: req.cookies[name] || '',
              }))
            : [];
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
