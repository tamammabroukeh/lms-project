export type TLoginResponse = {
  AccessToken: string;
  userName: string;
  userEmail: string;
  roles: string[];
  profileImage: string;
  age: number;
  enrolledCourses: string[];
  gender: string;
} | null;
export type TAuthContext = {
  auth: TLoginResponse;
  setAuth: React.Dispatch<React.SetStateAction<TLoginResponse>>;
};
// export type IAuthContext = {
//   signInFormData: ISignInData;
//   signUpFormData: ISignUpData;
//   setSignInFormData: React.Dispatch<React.SetStateAction<ISignInData>>;
//   setSignUpFormData: React.Dispatch<React.SetStateAction<ISignUpData>>;
//   handleRegisterUser: (event: FormEvent) => Promise<void>;
//   handleLoginUser: (event: FormEvent) => Promise<void>;
//   auth: {
//     authenticate: boolean;
//     user: {} | null;
//   };
//   resetCredentials: () => void;
// };
