import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { category, id, imgUrl, price, productName },
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`, { state: product });
  };
  return (
    <article
      className="border border-zinc-300 rounded-xl overflow-hidden p-5 shadow-lg hover:scale-105 transition-all duration-500 dark:bg-zinc-200 dark:text-zinc-800"
      onClick={handleClick}
    >
      <img className="aspect-[5/6] rounded-xl" src={imgUrl} alt={productName} />
      <div className="px-2">
        <p className="text-brand text-lg font-semibold pt-3 pb-2">
          &gt; {category}
        </p>
        <div className="flex justify-between text-base">
          <p className="font-bold">{productName}</p>
          <p className="font-semibold">₩{price.toLocaleString("ko")}</p>
        </div>
      </div>
    </article>
  );
}
