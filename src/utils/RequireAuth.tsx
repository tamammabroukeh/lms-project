import { useAuthContext } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const { auth } = useAuthContext();
  console.log("auth", auth)
  if (!auth?.accessToken && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  // if (
  //   authenticated &&
  //   user?.role !== "instructor" &&
  //   (location.pathname.includes("instructor") ||
  //     location.pathname.includes("/auth"))
  // ) {
  //   return <Navigate to="/home" />;
  // }

  // if (
  //   authenticated &&
  //   user.role === "instructor" &&
  //   !location.pathname.includes("instructor")
  // ) {
  //   return <Navigate to="/instructor" />;
  // }

  const content = auth?.userData?.roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
  return content;
};

export default RequireAuth;
