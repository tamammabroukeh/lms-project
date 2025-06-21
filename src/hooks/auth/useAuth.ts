import { AuthContext } from "@/context/auth-context/new-auth";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
