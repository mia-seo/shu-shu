import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, getCarts, setCartItem } from "../api/database";
import { useUser } from "../context/userContext";

export function useCarts() {
  const { uid } = useUser();
  const queryClient = useQueryClient();

  const getCartsQuery = useQuery(["carts", uid], () => getCarts(uid), {
    staleTime: 1000 * 60 * 5,
  });

  const setCart = useMutation(
    (selectedProduct) => setCartItem(uid, selectedProduct),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const removeCart = useMutation((id) => deleteItem(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  });
  return { getCartsQuery, setCart, removeCart };
}
