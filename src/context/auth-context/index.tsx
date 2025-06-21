// import { Skeleton } from "@/components/ui/skeleton";
// // import { initialSignInFormData, initialSignUpFormData } from "@/config";
// import { checkAuthService, loginService, registerService } from "@/services";
// import { createContext, FormEvent, useEffect, useState } from "react";
// import { IChildren } from "@/interfaces";
// import { IAuthContext, ISignInData, ISignUpData } from "@/types";

// export const AuthContext = createContext<IAuthContext | null>(null);

// export default function AuthProvider({ children }: IChildren) {
//   const [signInFormData, setSignInFormData] = useState();
//   const [signUpFormData, setSignUpFormData] = useState();
//   // const [signInFormData, setSignInFormData] = useState<ISignInData>(
//   //   initialSignInFormData as unknown as ISignInData
//   // );
//   // const [signUpFormData, setSignUpFormData] = useState<ISignUpData>(
//   //   initialSignUpFormData as unknown as ISignUpData
//   // );
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });
//   const [loading, setLoading] = useState(true);

//   async function handleRegisterUser(event: FormEvent) {
//     event.preventDefault();
//     const data = await registerService(signUpFormData);
//   }

//   async function handleLoginUser(event: FormEvent) {
//     event.preventDefault();
//     const data = await loginService(signInFormData);
//     console.log(data, "datadatadatadatadata");

//     if (data.success) {
//       sessionStorage.setItem(
//         "accessToken",
//         JSON.stringify(data.data.accessToken)
//       );
//       setAuth({
//         authenticate: true,
//         user: data.data.user,
//       });
//     } else {
//       setAuth({
//         authenticate: false,
//         user: null,
//       });
//     }
//   }

//   //check auth user

//   async function checkAuthUser() {
//     try {
//       const data = await checkAuthService();
//       if (data.success) {
//         setAuth({
//           authenticate: true,
//           user: data.data.user,
//         });
//         setLoading(false);
//       } else {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     } catch (error: any) {
//       console.log(error);
//       if (!error?.response?.data?.success) {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     }
//   }

//   function resetCredentials() {
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//   }

//   useEffect(() => {
//     checkAuthUser();
//   }, []);

//   console.log(auth, "gf");

//   return (
//     <AuthContext.Provider
//       value={{
//         signInFormData,
//         signUpFormData,
//         setSignInFormData,
//         setSignUpFormData,
//         handleRegisterUser,
//         handleLoginUser,
//         auth,
//         resetCredentials,
//       }}
//     >
//       {loading ? <Skeleton /> : children}
//     </AuthContext.Provider>
//   );
// }
