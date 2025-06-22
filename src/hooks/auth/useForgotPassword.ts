import { ForgotPassSchema, ForgotPassType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateData, useSearchParams, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { objToFormData } from "@/utils/objToFormData";
import { ForgotPassRoute } from "@/api/routes";
import AuthData, { initialSignInFormData } from "@/data/auth";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const useForgotPassword = () => {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  const { getParam } = useSearchParams();
  const ForgotSchema = useMemo(() => ForgotPassSchema(t), [t]);

  const form = useForm<ForgotPassType>({
    mode: "all",
    resolver: zodResolver(ForgotSchema),
    defaultValues: initialSignInFormData,
  });

  const forgotPassMutation = useMutateData({
    mutationFn: (data) => axios.post(ForgotPassRoute, data),
    onSuccessFn(data) {
      console.log("data from on success", data);
      navigate(
        `/auth/reset-password?username=${
          getParam("username") ?? data?.data?.userEmail ?? data?.data?.email
        }&email=${getParam("email") ?? form.getValues().userEmail}`
      );
      form.reset();
    },
    onErrorFn(errorMessage, variables) {
      console.log("errorMessage", errorMessage);
      console.log("variables", variables);
    },
  });

  const submitHandler: SubmitHandler<ForgotPassType> = async (data) => {
    const formData = objToFormData({ email: data.userEmail });
    await forgotPassMutation.mutateAsync(formData);
  };

  const handleResendCode = async () => {
    await forgotPassMutation.mutateAsync({ email: getParam("email") });
  };

  const handleClick = () => {
    console.log("handling");
    localStorage.setItem("auth-tab", "Sign Up");
  };

  let title = t("auth:forgotPassTitle");
  let description = t("auth:forgotPassDescription");
  let newAccount = t("auth:create_new_account");
  const ForgotPassFormControls = useMemo(
    () => AuthData(t).signUpFormControls,
    [t]
  );

  return {
    error: forgotPassMutation.error,
    isError: forgotPassMutation.isError,
    isLoading: forgotPassMutation.isLoading,
    isSuccess: forgotPassMutation.isSuccess,
    errors: form.formState.errors,
    btntext: t("auth:send_login_link"),
    submitHandler,
    form,
    title,
    description,
    inputs: ForgotPassFormControls.slice(1, 2),
    newAccount,
    handleClick,
    handleResendCode,
  };
};

export default useForgotPassword;
