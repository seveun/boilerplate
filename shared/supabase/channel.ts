import type { SupabaseClient } from '../types/supabase.ts';
import type { SupabaseRealtimeChannel } from '../types/supabase.ts';

const DEFAULT_DEBOUNCE_TIME = 1000;

let channelId = 0;

export const listenChannel = (
  supabase: SupabaseClient,
  tableName: string,
  callback: Function,
  filter?: string,
  debounceTime: number = DEFAULT_DEBOUNCE_TIME,
) => {
  let timeoutId: NodeJS.Timeout;
  let isSubscribed = true;

  const debouncedCallback = async () => {
    if (!isSubscribed) return;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      try {
        await callback();
      } catch (error) {
        console.error(`Error in channel callback for ${tableName}:`, error);
      }
    }, debounceTime);
  };

  const channel = supabase
    .channel(`${tableName}_${channelId++}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName,
        ...(filter ? { filter } : {}),
      },
      debouncedCallback
    )
    .subscribe((status) => {
      if (status === 'CLOSED') {
        isSubscribed = false;
        clearTimeout(timeoutId);
      }
    });

  return channel;
};

export const unsubscribe = async (
  channels: SupabaseRealtimeChannel | SupabaseRealtimeChannel[],
) => {
  if (Array.isArray(channels)) {
    channels.forEach((channel: SupabaseRealtimeChannel) => {
      channel.unsubscribe();
    });
  } else {
    channels.unsubscribe();
  }
};
