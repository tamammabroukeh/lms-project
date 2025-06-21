import { ResetPassSchema, ResetPassType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateData, useSearchParams, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
// import { objToFormData } from "@/utils/objToFormData";
import { ResetPassRoute } from "@/api/routes";
import AuthData from "@/data/auth";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createAstrics } from "@/utils/helpers";
const useGetAllCourses = () => {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  const ResetSchema = useMemo(() => ResetPassSchema(t), [t]);
  const { getParam } = useSearchParams();

  const form = useForm<ResetPassType>({
    mode: "all",
    resolver: zodResolver(ResetSchema),
    defaultValues: AuthData(t, getParam("email") ?? "")
      .initialResetPassFormData,
  });

  const resetPassMutation = useMutateData({
    mutationFn: (data) => axios.post(ResetPassRoute, data),
    onSuccessFn(data) {
      console.log("data from on success", data);
      form.reset();
      navigate("/");
    },
    onErrorFn(errorMessage, variables) {
      console.log("errorMessage", errorMessage);
      console.log("variables", variables);
    },
  });

  const submitHandler: SubmitHandler<ResetPassType> = async (data) => {
    // const formData = objToFormData(data);
    await resetPassMutation.mutateAsync(data);
  };
  // tammammb367@gmail.com
  let splitEmail = getParam("email")?.split("@");
  let splitExtention = splitEmail?.[1].split(".");

  let title = t("auth:resetCodeTitle");

  let description =
    t("auth:resetCodeDescription_1") +
    ` ${getParam("username")}. ` +
    t("auth:resetCodeDescription_2");

  let specificDescription = ` ${getParam("email")?.[0]}${createAstrics(
    splitEmail?.[0] ? splitEmail?.[0].length - 2 : 10
  )}${splitEmail?.[0]?.[splitEmail?.[0]?.length - 1]}@${
    splitExtention?.[0][0]
  }${createAstrics(splitExtention?.[0] ? splitExtention?.[0].length - 1 : 4)}.${
    splitExtention?.[1]
  }. `;

  let resendCode = t("auth:resendCode");

  const ResetPassFormControls = useMemo(
    () => AuthData(t).ResetPassFormControls,
    [t]
  );

  return {
    error: resetPassMutation.error,
    isError: resetPassMutation.isError,
    isLoading: resetPassMutation.isLoading,
    isSuccess: resetPassMutation.isSuccess,
    errors: form.formState.errors,
    btntext: t("auth:verifyCode"),
    submitHandler,
    form,
    title,
    description,
    specificDescription,
    inputs: ResetPassFormControls,
    resendCode,
  };
};

export default useGetAllCourses;
