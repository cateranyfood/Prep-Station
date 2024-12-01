import { useSupabaseQuery } from "@/features/shared/functions/fetcher";
import { supabase } from "@/features/shared/lib/supabase";

export const useMenu = (restaurant_id: string | number | null) => {
  return useSupabaseQuery(['menu'], async () =>
    supabase.from('menu').select('*').eq("restaurant_id", restaurant_id)
  );
};