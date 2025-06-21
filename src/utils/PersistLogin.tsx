import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext, useMutateData } from "@/hooks";
import axios, { setAuthToken } from "@/api/axiosInstance";
import { refreshRoute } from "@/api/routes";

export default function PersistLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAuthContext();
  const token = localStorage.getItem("token");
  console.log(token);

  const refreshMutation = useMutateData({
    mutationFn: () => axios.get(refreshRoute),
    onSuccessFn(data, variables) {
      console.log("variables", variables);
      console.log("data", data);
      setAuth(data.data);
      setAuthToken(data.data.token);
      setLoading(false);
    },
    onErrorFn(error) {
      console.log("error", error);
      navigate("/auth", { replace: true });
    },
  });

  useEffect(() => {
    token !== null ? refreshMutation.mutate({}) : setLoading(false);
  }, []);
  return <>{loading ? <div>Loading...</div> : <Outlet />}</>;
}
