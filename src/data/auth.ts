import {
  IinitialSignInFormData,
  IinitialSignUpFormData,
  ISignFormControls,
} from "@/interfaces";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
import { IinitialResetPassFormData } from "@/interfaces/auth";
export default function AuthData(t: TypedTFunction, param?: string) {
  const signUpFormControls: ISignFormControls[] = [
    {
      name: "userName",
      label: t("auth:userName"),
      placeholder: t("auth:userName_placeholder"),
      type: "text",
    },
    {
      name: "userEmail",
      label: t("auth:email"),
      placeholder: t("auth:email_placeholder"),
      type: "text",
    },
    {
      name: "password",
      label: t("auth:password"),
      placeholder: t("auth:password_placeholder"),
      type: "password",
    },
  ];
  const ResetPassFormControls: ISignFormControls[] = [
    // signUpFormControls[1],
    {
      name: "newPassword",
      label: t("auth:new_password"),
      placeholder: t("auth:new_password_placeholder"),
      type: "password",
    },
    {
      name: "resetCode",
      label: t("auth:resetCode"),
      placeholder: t("auth:resetCode_placeholder"),
      type: "text",
    },
  ];

  const initialResetPassFormData: IinitialResetPassFormData = {
    newPassword: "",
    userEmail: param ?? "",
    resetCode: "",
  };

  return {
    initialResetPassFormData,
    signUpFormControls,
    ResetPassFormControls,
  };
}

export const initialSignInFormData: IinitialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData: IinitialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
