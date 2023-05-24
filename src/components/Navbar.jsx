import React from "react";
import { BsFillCartFill, BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import Button from "./ui/Button";
import User from "./User";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signin, signout } = useUser();

  return (
    <nav>
      <div className="w-full flex justify-center bg-zinc-300 py-2">
        <img
          className="w-[100px] rounded-sm"
          src="https://github.com/mia-seo/shu-shu/assets/117281717/31fd8bb1-c580-4594-acdf-a2070e0acdbd"
          alt="shushu"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex justify-between items-center px-1 py-3">
        <div className="flex gap-2 text-lg font-semibold">
          {CATEGORIES.map((el, index) => (
            <button
              className="capitalize hover:text-accent transition-all duration-150"
              key={index}
              onClick={() => {
                navigate(`/products/${el}`);
              }}
            >
              {el}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5 text-xl">
          {user && (
            <button
              className="hover:text-accent transition-all duration-150"
              onClick={() => navigate("/carts")}
            >
              <BsFillCartFill />
            </button>
          )}
          {user && user.isAdmin && (
            <button
              className="hover:text-accent transition-all duration-150"
              onClick={() => navigate("/products/new")}
            >
              <BsPencilFill />
            </button>
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
