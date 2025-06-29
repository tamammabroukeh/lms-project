import React from "react";
import { Suspense } from "react";
import Loader from "./Loader";
const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={<Loader />}
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;