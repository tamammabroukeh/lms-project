import {
  Flex,
  ReusableCard,
  ReusableForm,
} from "@/components/Reusable-Components";
import { LockIcon } from "lucide-react";
import { ForgotPassType } from "@/schemas";
import { useForgotPassword } from "@/hooks";
import React from "react";

const ForgotPassword = () => {
  const {
    btntext,
    errors,
    form,
    isError,
    isSuccess,
    error,
    isLoading,
    submitHandler,
    description,
    title,
    inputs,
    newAccount,
    handleClick,
  } = useForgotPassword();
  console.log("isError", isError);
  console.log("isSuccess", isSuccess);
  console.log("error", error);
  return (
    <Flex classes="my-auto bg-background">
      <ReusableCard
        styleForCard={"w-[30%]"}
        descriptionStyle="mx-auto"
        {...{ title, description }}
        Icon={LockIcon}
      >
        <ReusableForm<ForgotPassType>
          link={{ path: "/auth", title: newAccount, handleClick }}
          submitButtonText={btntext}
          {...{ form, submitHandler, isLoading, errors, inputs }}
        />
      </ReusableCard>
    </Flex>
  );
};
export default React.memo(ForgotPassword);
