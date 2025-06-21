import { createContext, useState } from "react";
import { IChildren } from "@/interfaces";
import { TAuthContext } from "@/types";
import { TLoginResponse } from "@/types/auth-types";
export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthProvider({ children }: IChildren) {
  const [auth, setAuth] = useState<TLoginResponse>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
