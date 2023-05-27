import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useUser } from "../context/userContext";
import { useCarts } from "../hooks/useCarts";

export default function ProductDetail() {
  const { state: product } = useLocation();
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSuccess] = useState();
  const { uid } = useUser();
  const { setCart } = useCarts(uid);

  const [selected, setSelected] = useState(product && product.size[0]);
  const handleChange = (e) => setSelected(e.target.value);
  const handleClick = () => {
    setIsAdding(true);
    const selectedProduct = { ...product, size: selected };
    setCart.mutate(
      selectedProduct,
      {
        onSuccess: () => {
          setSuccess("✅ 성공적으로 장바구니에 담았습니다.");
          setTimeout(() => setSuccess(null), 3000);
        },
      },
      {
        onSettled: () => setIsAdding(false),
      }
    );
  };

  return (
    <>
      {product && (
        <section className="p-5">
          <p className="pb-8">&gt;{product.category}</p>
          <div className="flex flex-col gap-5 md:flex-row">
            <img
              className="max-w-[600px] aspect-[5/6] rounded-xl"
              src={product.imgUrl}
              alt={product.productName}
            />
            <div className="w-full">
              <div className="px-3 pb-3 border-b border-zinc-300">
                <h2 className="text-xl font-bold">{product.productName}</h2>
                <p>₩{product.price.toLocaleString("ko")}</p>
              </div>
              <pre className="p-3 py-5 whitespace-pre-line">
                {product.detail}
              </pre>
              <div className="flex flex-col gap-5 px-3">
                <form className="grid grid-cols-4 items-center gap-3">
                  <label className="" htmlFor="size">
                    사이즈
                  </label>
                  <select
                    className="col-span-3 border border-zinc-400 p-3"
                    id="size"
                    value={selected}
                    onChange={handleChange}
                  >
                    {product.size.map((el, index) => (
                      <option key={index}>{el}</option>
                    ))}
                  </select>
                </form>
                {success && <p>{success}</p>}
                <Button
                  text="장바구니에 담기"
                  disabled={isAdding}
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
