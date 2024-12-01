import { supabase } from "@/features/shared/lib/supabase";
import { useMutation, useQueryClient, MutationFunction } from "@tanstack/react-query";

// Define the expected input and output types for the mutation
type MenuItemInput = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type MenuItemOutput = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  createdAt: string;
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<MenuItemOutput, MenuItemInput> = async (newMenuItem) => {
    const { data, error } = await supabase
      .from("menu")
      .insert(newMenuItem)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0]; // Return the newly created menu item
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      // Invalidate and refetch the menu query
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  return mutation;
};
