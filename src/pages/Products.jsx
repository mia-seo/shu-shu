import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const { category } = useParams();
  const {
    getProductsQuery: { isLoading, error, data: products },
  } = useProducts(category);

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
