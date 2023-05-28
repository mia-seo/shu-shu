import React, { useEffect, useState } from "react";
import { BsFillCartFill, BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useCarts } from "../hooks/useCarts";
import Button from "./ui/Button";
import User from "./User";

export default function Navbar() {
  const { user, signin, signout } = useUser();
  const [clicked, setClicked] = useState("products");
  const {
    getCartsQuery: { data },
  } = useCarts();

  const handleClick = (name) => setClicked(name);

  return (
    <nav>
      <Link className="w-full flex justify-center bg-zinc-300 py-2" to="/">
        <img
          className="w-[100px] rounded-sm"
          src="https://github.com/mia-seo/shu-shu/assets/117281717/31fd8bb1-c580-4594-acdf-a2070e0acdbd"
          alt="shushu"
        />
      </Link>
      <div className="flex justify-between items-center px-1 py-3">
        <div className="flex gap-2 text-lg font-semibold md:gap-5">
          {CATEGORIES.map((el, index) => (
            <Link
              className={`${
                el === clicked ? "text-brand border-b-2 border-brand" : ""
              } capitalize hover:text-brand transition-all duration-150`}
              key={index}
              onClick={() => handleClick(el)}
              to={`/products/${el}`}
            >
              {el}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5 text-2xl">
          {user && (
            <Link
              className="hover:text-brand transition-all duration-150"
              to="/carts"
            >
              <div className="relative">
                <p className="w-5 h-5 absolute -top-2 -right-2 bg-brand rounded-full text-white text-sm text-center font-semibold">
                  {data ? data.length : 0}
                </p>
                <BsFillCartFill />
              </div>
            </Link>
          )}
          {user && user.isAdmin && (
            <Link
              className="hover:text-brand transition-all duration-150"
              to="/products/new"
            >
              <BsPencilFill />
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <User user={user} />
              <Button text="Logout" onClick={signout} />
            </div>
          ) : (
            <Button text="Login" onClick={signin} />
          )}
        </div>
      </div>
    </nav>
  );
}

const CATEGORIES = ["products", "women", "men"];
