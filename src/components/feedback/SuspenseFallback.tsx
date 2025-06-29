import React from "react";
import { Suspense } from "react";
import LoadingSpinner from "@/assets/loading-spinner.svg";
const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center min-h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
