import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext, useMutateData } from "@/hooks";
import axios, { setAuthToken } from "@/api/axiosInstance";
import { refreshRoute } from "@/api/routes";

export default function PersistLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthContext();
  const token = localStorage.getItem("token");
  console.log(token);

  const refreshMutation = useMutateData({
    mutationFn: () => axios.post(refreshRoute),
    onSuccessFn(data, variables) {
      console.log("variables", variables);
      console.log("data", data);
      setAuth(data.data);
      setAuthToken(data.data.token);
      navigate("/auth", { replace: true });
      setLoading(false);
    },
  });

  useEffect(() => {
    token !== null ? refreshMutation.mutate({}) : setLoading(false);
  }, []);
  return <>{loading ? <div>Loading...</div> : <Outlet />}</>;
}
