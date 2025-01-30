import type { SupabaseClient } from '../../types/supabase.ts';
import { Tables } from '../../types/database.ts';

export type Image = Tables<'directus_files'>;

export const getImage = async (
  supabase: SupabaseClient,
  id: string,
): Promise<Image> => {
  const { data: image } = await supabase
    .from('directus_files')
    .select('id, filename_disk, width, height')
    .eq('id', id)
    .limit(1)
    .single();
  return image as Image;
};

export const getImages = async (
  supabase: SupabaseClient,
  ids: string[],
): Promise<Image[]> => {
  const { data: images } = await supabase
    .from('directus_files')
    .select('id, filename_disk, width, height')
    .in('id', ids);
  return images as Image[];
};
