import { useMutateData, useTypedTranslation, useAuthContext } from "@/hooks";
import axios from "@/api/axiosInstance";
import { logoutRoute } from "@/api/routes";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const { setAuth, auth } = useAuthContext();
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  console.log("auth",auth)
  const logoutMutation = useMutateData({
    mutationFn: () => axios.post(logoutRoute),
    onSuccessFn(data) {
      console.log("data from on success", data);
      setAuth(null);
      navigate("/");
    },
  });

  const logoutHandler = async () => {
    await logoutMutation.mutateAsync({});
  };
  const btnText = auth?.accessToken ? t("auth:signout") : t("auth:signin");

  const handleLoginOrLogout = () => {
    auth?.accessToken ? logoutHandler() : navigate("/auth");
  };
  return {
    error: logoutMutation.error,
    isError: logoutMutation.isError,
    isLoading: logoutMutation.isLoading,
    isSuccess: logoutMutation.isSuccess,
    btnText,
    logoutHandler,
    handleLoginOrLogout,
  };
};

export default useLogout;
