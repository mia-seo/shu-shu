import React from "react";
import { FaEquals, FaPlus } from "react-icons/fa";

export default function Counter({ price }) {
  const SHIPPING = 3000;
  return (
    <article className="w-full grid grid-cols-8 py-8 place-items-center dark:text-zinc-800">
      <div className="h-[150px] w-[200px] col-span-2 flex flex-col items-center justify-center bg-zinc-100 gap-2">
        <p className="text-lg font-bold">총 상품 가격</p>
        {price && <p>{`₩${price.toLocaleString()}`}</p>}
      </div>
      <p className="text-xl">
        <FaPlus />
      </p>
      <div className="h-[150px] w-[200px] col-span-2 flex flex-col items-center justify-center bg-zinc-100 gap-2">
        <p className="text-lg font-bold">배송비</p>
        <p>{`₩${SHIPPING.toLocaleString()}`}</p>
      </div>
      <p className="text-xl">
        <FaEquals />
      </p>
      <div className="h-[150px] w-[200px] col-span-2 flex flex-col items-center justify-center bg-zinc-100 gap-2">
        <p className="text-lg font-bold">총 가격</p>
        {price && <p>{`₩${(price + SHIPPING).toLocaleString()}`}</p>}
      </div>
    </article>
  );
}
