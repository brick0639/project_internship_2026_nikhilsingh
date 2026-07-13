import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectRouteProps {
  isLogin: boolean;
  children: React.ReactNode;
}

const ProtectRoute = ({ isLogin, children }: ProtectRouteProps) => {
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;