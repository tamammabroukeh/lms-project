import { ISignFormControls } from ".";

export interface IinitialSignInFormData {
  userEmail: string;
  password: string;
}
export interface IinitialSignUpFormData extends IinitialSignInFormData {
  userName: string;
}
export interface IinitialResetPassFormData {
  newPassword: string;
  userEmail: string;
  resetCode: string;
}
export interface IAuthForm {
  dataInputs: ISignFormControls[];
  forgetPassword?: boolean;
  link?: {
    path: string;
    title: string;
    handleClick?: () => void;
  };
}
