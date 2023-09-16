import { useMutation } from "@tanstack/react-query";
import { fetchJSON } from "../lib/fetchJson";
import { queryClient } from "../lib/reactQuery";
import { Product } from "./getProduct";

export type CreateProductReq = {
  description: string;
  title: string;
  brand: string;
  price: string;
};

export const createProduct = async (data: CreateProductReq) => {
  const response = await fetchJSON<Product>(
    "https://dummyjson.com/products/add",
    {
      method: "Post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export type queryConfigOption = {
  filter?: Record<string, string>;
  enabled?: boolean;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const optimisticProduct = { id: Date.now().toString(), ...newProduct };

      const previousProduct = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData(
        ["products"],
        [optimisticProduct, ...(previousProduct || [])]
      );

      return { previousProduct };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },

    onError: (error, payload, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(["products"], context?.previousProduct);
      }
    },
  });
};
