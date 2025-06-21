import { SignInSchema, SignInType, SignUpSchema, SignUpType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateData, useTypedTranslation, useAuthContext } from "@/hooks";
import axios, { setAuthToken } from "@/api/axiosInstance";
// import { objToFormData } from "@/utils/objToFormData";
import { loginRoute, registerRoute } from "@/api/routes";
import { IActiveTab } from "@/interfaces";
import { initialSignInFormData, initialSignUpFormData } from "@/data/auth";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { useMutation } from "react-query";
const useLogin = ({ activeTab }: IActiveTab) => {
  const { setAuth } = useAuthContext();
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  const isLoginTab = activeTab === "Sign In";

  const registerSchema = useMemo(() => SignUpSchema(t), [t]);
  const loginSchema = useMemo(() => SignInSchema(t), [t]);

  const form = useForm<SignInType | SignUpType>({
    mode: "all",
    resolver: zodResolver(isLoginTab ? loginSchema : registerSchema),
    defaultValues: isLoginTab ? initialSignInFormData : initialSignUpFormData,
  });

  const authMutation = useMutateData({
    mutationFn: (data) =>
      axios.post(isLoginTab ? loginRoute : registerRoute, data),
    onSuccessFn(data, variables) {
      console.log("variables from on success", variables);
      console.log("data from on success", data);
      setAuth(data?.data);
      localStorage.setItem("token", data?.data?.AccessToken);
      setAuthToken(data?.data?.AccessToken);
      form.reset();
      data?.data?.AccessToken && navigate("/");
    },
  });

  const submitHandler: SubmitHandler<SignInType | SignUpType> = async (
    data
  ) => {
    console.log(data);
    // const formData = objToFormData(data);
    await authMutation.mutateAsync(data);
    // authMutation.mutateAsync(formData);
    // const response = await axios.post(
    //   isLoginTab ? loginRoute : registerRoute,
    //   data
    // );
    // console.log("response", response);
    // console.log(authMutation.data?.data);
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
  };
  const btntext = isLoginTab ? t("auth:signin") : t("auth:signup");
  return {
    error: authMutation.error,
    isError: authMutation.isError,
    isLoading: authMutation.isLoading,
    isSuccess: authMutation.isSuccess,
    errors: form.formState.errors,
    btntext,
    submitHandler,
    form,
  };
};

export default useLogin;
