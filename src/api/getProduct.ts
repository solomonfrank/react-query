import { useQuery } from "@tanstack/react-query";
import { FetchError, fetchJSON } from "../lib/fetchJson";

export type Product = {
  id: string;
  description: string;
  title: string;
  thumbnail: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};

export const getProductHandler = async (): Promise<Product[]> => {
  const response = await fetchJSON<ProductResponse>(
    "https://dummyjson.com/products"
  );
  return response.products;
};

export type queryConfigOption = {
  filter?: Record<string, string>;
  enabled?: boolean;
};

export const useGetProduct = ({ enabled = true }: queryConfigOption) => {
  return useQuery<Product[], FetchError>({
    queryFn: () => getProductHandler(),
    queryKey: ["products"],
    enabled,
  });
};
