import React from "react";
import Products from "./Products";

export default function Home() {
  return (
    <section className="py-8">
      <img
        className="pb-5"
        src="https://github.com/mia-seo/shu-shu/assets/117281717/59605307-0ea9-4a04-bb52-e277a5901351"
        alt="banner"
      />
      <Products />
    </section>
  );
}
