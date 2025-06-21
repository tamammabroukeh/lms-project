import {
  Flex,
  ReusableButton,
  ReusableCard,
  ReusableForm,
} from "@/components/Reusable-Components";
import { Verified } from "lucide-react";
import { ResetPassType } from "@/schemas";
import { useForgotPassword, useResetPassword } from "@/hooks";
export default function ResetPassword() {
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
    resendCode,
    specificDescription,
  } = useResetPassword();
  console.log("isError", isError);
  console.log("isSuccess", isSuccess);
  console.log("error", error);
  const { handleResendCode, isLoading: isLoadingForgot } = useForgotPassword();
  return (
    <Flex classes="my-auto bg-background">
      <ReusableCard
        styleForCard={"w-[30%]"}
        descriptionStyle="mx-auto"
        titleStyle="text-2xl"
        {...{ title, description, specificDescription }}
        Icon={Verified}
      >
        <ReusableForm<ResetPassType>
          submitButtonText={btntext}
          {...{
            form,
            submitHandler,
            isLoading,
            errors,
            inputs,
          }}
        />
        <ReusableButton
          variant={"ghost"}
          type="button"
          onClick={handleResendCode}
          btnText={resendCode}
          isLoading={isLoadingForgot}
          className="w-full"
          disabled={isLoadingForgot}
        />
      </ReusableCard>
    </Flex>
  );
}
