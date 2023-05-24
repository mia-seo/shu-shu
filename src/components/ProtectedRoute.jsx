import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function ProtectedRoute({ children, required }) {
  const { user, isAdmin } = useUser();

  if (!user || (required && isAdmin)) return <Navigate to="/" replace={true} />;
  return <>{children}</>;
}
