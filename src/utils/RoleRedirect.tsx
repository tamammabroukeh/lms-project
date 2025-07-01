import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks";

const RoleRedirect = () => {
  const { auth } = useAuthContext();
  const role = auth?.userData?.role;

  switch (role) {
    case "teacher":
      return <Navigate to="/instructor" replace />;
    case "admin":
      return <Navigate to="/admin" replace />;
    case "student":
      return <Navigate to="/" replace />;
    default:
      return <Navigate to="/auth" replace />;
  }
};

export default RoleRedirect;