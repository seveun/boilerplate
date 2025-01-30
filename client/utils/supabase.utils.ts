import { NEXT_PUBLIC_API_URL } from '@/config.ts';
import { createClient } from '@/utils/supabase/component';
import { unsubscribe } from '@shared/supabase/channel.ts';
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { useCallback, useEffect, useReducer } from 'react';

type SupabaseQueryOptions<P = any, D = null, L = any> = {
  payload?: P;
  skip?: boolean;
  defaultValue?: D;
  listener?: {
    fn: (
      supabase: SupabaseClient,
      cb: () => void,
      payload: L,
    ) => RealtimeChannel | Array<RealtimeChannel>;
    payload?: L;
  };
};

type SupabaseQueryState<T = any, D = null> = {
  isLoading: boolean;
  data: T | D;
  error: Error | null;
};

export function useSupabaseQuery<T = any, P = any, D = null, L = any>(
  request: (supabase: SupabaseClient, payload: P) => Promise<T>,
  options?: SupabaseQueryOptions<P, D, L>,
) {
  const [{ isLoading, data, error }, dispatch] = useReducer(
    (p: SupabaseQueryState<T, D>, n: Partial<SupabaseQueryState<T, D>>) => ({
      ...p,
      ...n,
    }),
    {
      isLoading: true,
      // force casting to D like this date is not null if there is default value
      data: (options?.defaultValue ?? null) as D,
      error: null,
    },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Use options only
  const fetch = useCallback(async () => {
    if (options?.skip) {
      dispatch({ isLoading: false, error: null });
      return;
    }

    dispatch({ isLoading: true, error: null });

    console.info('Requesting data...', options, request);

    try {
      const client = createClient();
      const data = await request(client, options?.payload as P);
      dispatch({ isLoading: false, data, error: null });
    } catch (error) {
      dispatch({ isLoading: false, error: error as Error });
    }
  }, [options?.skip, options?.payload]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (!options?.listener?.fn || options?.skip) return;
    const client = createClient();
    const channel = options.listener.fn(
      client,
      fetch,
      options?.listener?.payload as L,
    );

    return () => {
      (async () => {
        try {
          await unsubscribe(channel);
        } catch (error) {
          console.error('Error unsubscribing from channel', error);
        }
      })();
    };
  }, [options?.listener?.fn, options?.listener?.payload, options?.skip, fetch]);

  return {
    data,
    isLoading,
    error,
    fetch,
  };
}

type SupabaseListenersOptions<A = any> = {
  payload?: A;
  skip?: boolean;
};

export function useSupabaseListeners<P = any>(
  listener: (
    supabase: SupabaseClient,
    cb: () => void,
    payload: P,
  ) => RealtimeChannel | Array<RealtimeChannel>,
  cb: () => void,
  options?: SupabaseListenersOptions<P>,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: Use options only
  useEffect(() => {
    if (options?.skip) return;

    const client = createClient();
    const channel = listener(client, cb, options?.payload as P);

    return () => {
      (async () => {
        try {
          await unsubscribe(channel);
        } catch (error) {
          console.error('Error unsubscribing from channel', error);
        }
      })();
    };
  }, [options?.payload, options?.skip]);
}

type SupabaseMutationFn<P = any> = (payload: P) => {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  authRequired?: boolean;
  body?: any;
  // params?: Record<string, any>;
  headers?: Record<string, any>;
};

type SupabaseMutationState<R = any> = {
  isLoading: boolean;
  error: MutationError | null;
  data: R | null;
};

type UseSupabaseMutation<P = any, R = any> = [
  (args: P) => { unwrap: () => Promise<R> },
  SupabaseMutationState<R>,
];

export class MutationError extends Error {
  constructor(
    public readonly data: undefined | { error: string },
    message: string,
  ) {
    super(message);
  }
}

export function CreateSupabaseMutation<P = any, R = any>(
  fn: SupabaseMutationFn,
) {
  function useSupabaseMutation(): UseSupabaseMutation<P, R> {
    const [{ isLoading, error, data }, dispatch] = useReducer(
      (p: SupabaseMutationState<R>, n: Partial<SupabaseMutationState<R>>) => ({
        ...p,
        ...n,
      }),
      {
        isLoading: false,
        error: null,
        data: null,
      },
    );

    const request = (payload: P) => {
      const { url, method, authRequired, body, headers } = fn(payload);

      const wrapper = async () => {
        dispatch({ isLoading: true, error: null });

        try {
          const client = createClient();

          const {
            data: { session },
          } = await client.auth.getSession();

          const authHeaders: Record<string, string> = {};

          if (!session?.access_token && authRequired) {
            throw new MutationError(undefined, 'Not authenticated');
          }

          if (authRequired) {
            authHeaders.Authorization = `Bearer ${session?.access_token}`;
          }

          const res = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
              ...authHeaders,
            },
            body: typeof body === 'object' ? JSON.stringify(body) : undefined,
          });

          if (!res.ok) {
            let body = undefined;
            try {
              if (res.body) {
                body = await res.json();
              }
            } catch {}

            throw new MutationError(body, res.statusText);
          }

          const data = await res.json();
          dispatch({ isLoading: false, data, error: null });
          return { data, error: null };
        } catch (error) {
          dispatch({
            isLoading: false,
            error: error as MutationError,
            data: null,
          });
          return { data: null, error: error as MutationError };
        }
      };

      const promise = wrapper();

      return {
        unwrap: async () => {
          const { data, error } = await promise;
          if (error) throw new MutationError(error.data, error.message);
          return data as R;
        },
      };
    };

    return [
      request,
      {
        isLoading,
        error,
        data,
      },
    ];
  }

  return { useSupabaseMutation };
}
