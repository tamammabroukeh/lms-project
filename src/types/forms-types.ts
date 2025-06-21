export type TNameSignFormControl =
  | "userName"
  | "userEmail"
  | "password"
  | "newPassword"
  | "resetCode";

export type TAuthData = {
  userName: string;
  userEmail: string;
  password: string;
};

// export interface ISignUpData extends FormData {
//   userName: string;
//   userEmail: string;
//   password: string;
// }

// export type ISignInData = Omit<ISignUpData, "userName">;
