import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NewProducts from "./pages/NewProducts";
import Carts from "./pages/Carts";
import ProtectedRoute from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products/:category", element: <Products /> },
      {
        path: "/products/new",
        element: (
          <ProtectedRoute required>
            <NewProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/carts",
        element: (
          <ProtectedRoute>
            <Carts />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
