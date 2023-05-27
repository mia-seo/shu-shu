import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, setNewProduct } from "../api/database";

export function useProducts(category) {
  const queryClient = useQueryClient();

  const getProductsQuery = useQuery(
    ["products", category],
    () => getProducts(category),
    { staleTime: 1000 * 60 * 5 }
  );

  const addProduct = useMutation((newProducts) => setNewProduct(newProducts), {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return { getProductsQuery, addProduct };
}
