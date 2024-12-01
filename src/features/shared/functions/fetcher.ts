import { useQuery } from "@tanstack/react-query";

export const useSupabaseQuery = <T>(
    key: string[], 
    fetcher: () => Promise<{ data: T | null; error: unknown }>,
    options = {}
  ) => {
    return useQuery({
      queryKey: key,
      queryFn: async () => {
        const { data, error } = await fetcher();
        if (error) throw error;
        return data;
      },
      ...options,
    });
  };