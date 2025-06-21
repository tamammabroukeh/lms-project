import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./i18n/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, StudentProvider, InstructorProvider } from "@/context";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen />
          </QueryClientProvider>
        </StudentProvider>
      </InstructorProvider>
      <ToastContainer position="top-center" />
    </AuthProvider>
);
