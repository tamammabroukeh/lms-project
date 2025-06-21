import useLogin from "@/hooks/auth/useLogin";
import { IActiveTab } from "@/interfaces/components/Tabs";
import { IAuthForm } from "@/interfaces/auth";
import { SignInType } from "@/schemas/SignInSchema";
import { SignUpType } from "@/schemas/SignUpSchema";
import { ReusableForm } from "../Reusable-Components";
import React from "react";
const AuthForm = ({
  activeTab,
  dataInputs,
  forgetPassword,
  link,
}: IActiveTab & IAuthForm) => {
  const {
    form,
    submitHandler,
    isLoading,
    btntext,
    errors,
    error,
    isError,
    isSuccess,
  } = useLogin({
    activeTab,
  });
  console.log("error", error);
  console.log("isError", isError);
  console.log("isSuccess", isSuccess);
  return (
    <ReusableForm<SignInType | SignUpType>
      inputs={dataInputs}
      submitButtonText={btntext}
      {...{ form, submitHandler, isLoading, errors, forgetPassword, link }}
    />
  );
};
export default React.memo(AuthForm);
