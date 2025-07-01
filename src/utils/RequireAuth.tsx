import { useAuthContext } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const { auth } = useAuthContext();
  // console.log("auth", auth)
  let token = auth?.accessToken
  let role = auth?.userData?.role
  // if (!token && !location.pathname.includes("/auth")) {
  //   return <Navigate to="/auth" />;
  // }

  // if (
  //   token &&
  //   role === "instructor" &&
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

  // const content = allowedRoles.includes(role ?? "") ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/auth" state={{ from: location }} replace />
  // );
  const content =
    <>
      {token ? (
        allowedRoles.includes(role ?? "") ? (
          <Outlet />
        ) : (
          <Navigate
            state={{ from: location }}
            replace
            to={"/"}
          />
        )
      ) : (
        <Navigate state={{ from: location }} replace to={"/auth"} />
      )}
    </>
  return content;
};

export default RequireAuth;
