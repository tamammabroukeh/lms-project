export type TLoginResponse = {
  accessToken: string;
  userData:{
    enrolledCourses:string[];
    userName: string;
    userEmail: string;
    roles: string[];
    gender: string;
    age:number;
    profileImage:string;
  }
} | null;
export type TAuthContext = {
  auth: TLoginResponse;
  setAuth: React.Dispatch<React.SetStateAction<TLoginResponse>>;
};