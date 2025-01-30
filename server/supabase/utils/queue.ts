import { getSupabaseAdmin } from "@utils/supabase.ts";
import map from "https://deno.land/x/promise_fns@v1.5.1/src/map.ts";

export async function sendMessage(queueName: string, message: any) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.schema("pgmq_public").rpc("send", {
    queue_name: queueName,
    message,
  });

  if (error) {
    console.error("Error when sending message :", error);
    return;
  }
}

export async function archiveMessage(queueName: string, msgId: number) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.schema("pgmq_public").rpc("archive", {
    queue_name: queueName,
    message_id: msgId,
  });

  if (error) {
    console.error("Error when archiving message :", error);
    return;
  }
}

export async function sendBatchMessages(queueName: string, messages: any[]) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .schema("pgmq_public")
    .rpc("send_batch", {
      queue_name: queueName,
      messages: messages.map((msg) => msg),
    });

  if (error) {
    console.error("Error when sending batch :", error);
    return;
  }
}

export async function popMessage(queueName: string, limit = 5) {
  const supabaseAdmin = getSupabaseAdmin();
  const data = await map(Array(limit), async () => {
    const { data, error } = await supabaseAdmin.schema("pgmq_public").rpc(
      "pop",
      {
        queue_name: queueName,
      },
    );
    if (error) {
      console.error("Error when popping message :", error);
      return;
    }
    if (!data?.[0]) return;
    return data?.[0];
  });
  return data.filter((data: any) => data !== undefined);
}

export async function popAllMessages(queueName: string) {
  const messages = [];
  while (true) {
    const newMessages = await popMessage(queueName, 20);
    messages.push(...newMessages);
    if (newMessages.length < 20) break;
  }
  return messages;
}
