import axios from "axios";
import { getSecret } from "@shared/utils/secret.ts";
import { Buffer } from "node:buffer";
import { getSupabaseAdmin } from "@utils/supabase.ts";
import type { SupabaseClient } from "@shared/types/supabase.ts";

interface Token {
  access_token: string;
  expires_at: number | null;
}

let token: Token = {
  access_token: "",
  expires_at: null,
};

const folders: Record<string, string> = {};

export const log = async (supabaseAdmin: SupabaseClient) => {
  const url = await getSecret(supabaseAdmin, "DIRECTUS_URL");

  const twentySecondsFromNow = Date.now() + 20 * 1000;
  if (token.expires_at && token.expires_at > twentySecondsFromNow) return;

  const response = await axios.post(`${url}/auth/login`, {
    email: await getSecret(supabaseAdmin, "DIRECTUS_USERNAME"),
    password: await getSecret(supabaseAdmin, "DIRECTUS_PASSWORD"),
  });

  token = {
    access_token: response.data.data.access_token,
    expires_at: Date.now() + response.data.data.expires,
  };
};

export const uploadFile = async (
  file: Buffer,
  filename: string,
  folderName: string,
  mimeType: string,
): Promise<string> => {
  const supabaseAdmin = getSupabaseAdmin();
  await log(supabaseAdmin);
  const url = await getSecret(supabaseAdmin, "DIRECTUS_URL");

  let folderId = folders?.[folderName] as string;

  if (!folderId) {
    const folderResponse = await axios.get(
      `${url}/folders?filter[name][_eq]=${folderName}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );

    if (!folderResponse.data.data?.[0]) {
      throw new Error(`Dossier "${folderName}" non trouvé`);
    }
    folderId = folderResponse.data.data[0].id;
    folders[folderName] = folderId;
  }

  const formData = new FormData();
  formData.append("folder", folderId);
  formData.append(
    "file",
    new Blob([file], { type: mimeType }),
    filename,
  );

  const result = await axios.post(`${url}/files`, formData, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  return result.data.data.id;
};
