import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/database";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { category } = useParams();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products", category], () => getProducts(category));

  if (isLoading) return <h2>Loading...💫</h2>;
  if (error) return <p>{error}</p>;
  return (
    <section className="grid grid-cols-1 place-content-center gap-5 px-5 sm:grid-cols-2 md:grid-cols-3 py-8">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </section>
  );
}
