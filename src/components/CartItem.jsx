import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { deleteItem } from "../api/database";
import { useCarts } from "../hooks/useCarts";

export default function CartItem({
  product,
  product: { id, imgUrl, productName, price, size },
  uid,
  onChange,
}) {
  const [count, setCount] = useState(1);
  const { removeCart } = useCarts(uid);

  const changeCount = (sign) => {
    if (sign === "-") {
      if (count > 1) {
        setCount((prev) => (prev -= 1));
        onChange(-price);
      }
    }
    if (sign === "+") {
      setCount((prev) => (prev += 1));
      onChange(price);
    }
  };

  const handleDelete = () => {
    onChange(-(price * count));
    removeCart.mutate(id);
  };

  if (product.length === 0) return;
  return (
    <article className="px-5 py-3 grid grid-cols-5 gap-5 items-center place-items-center">
      <img
        className="w-full aspect-[1/1] rounded-md"
        src={imgUrl}
        alt={productName}
      />
      <h2 className="text-lg font-bold">{productName}</h2>
      <p className="text-lg">사이즈 : {size}</p>
      <p className="text-lg">₩{price.toLocaleString()}</p>
      <div className="w-full flex justify-end items-center gap-2 text-xl">
        <button onClick={() => changeCount("-")}>
          <AiOutlineMinusCircle />
        </button>
        <p className="border-2 border-zinc-500 p-3 py-1 rounded-sm">{count}</p>
        <button onClick={() => changeCount("+")}>
          <AiOutlinePlusCircle />
        </button>
        <button className="mx-2" onClick={handleDelete}>
          <BsTrash3 />
        </button>
      </div>
    </article>
  );
}
