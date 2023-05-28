import React, { useState } from "react";
import CartItem from "../components/CartItem";
import Counter from "../components/Counter";
import { useCarts } from "../hooks/useCarts";

export default function Carts() {
  const {
    getCartsQuery: { isLoading, error, data: products },
  } = useCarts();

  const [total, setTotal] = useState(
    products && products.map((el) => el.price).reduce((a, b) => a + b)
  );

  const changeTotal = (price) => {
    setTotal((prev) => (prev += price));
  };

  if (isLoading) return <h2>Loading...💫</h2>;
  if (error) return <p>{error}</p>;
  return (
    <section className="flex flex-col items-center py-8">
      <h1 className="text-xl font-bold py-5 text-center">내 장바구니</h1>
      <div className="w-full min-y-[300px] grid grid-cols-5 place-items-center py-3 text-lg font-semibold border-y border-zinc-400 mb-5 bg-zinc-100 dark:text-zinc-800">
        <p className="col-span-2">상품 정보</p>
        <p>사이즈</p>
        <p>가격</p>
        <p>수량</p>
      </div>
      <div className="min-h-[300px]">
        {products &&
          products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onChange={changeTotal}
            />
          ))}
      </div>
      <Counter price={total} />
    </section>
  );
}
