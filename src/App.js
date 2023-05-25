import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/userContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <UserProvider>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </UserProvider>
  );
}
