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