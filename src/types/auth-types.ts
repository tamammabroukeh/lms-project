export type TLoginResponse = {
  accessToken: string;
  userData:{
    _id:string;
    enrolledCourses:string[];
    userName: string;
    userEmail: string;
    role: string;
    gender: string;
    age:number;
    profileImage:string;
  }
} | null;
export type TAuthContext = {
  auth: TLoginResponse;
  setAuth: React.Dispatch<React.SetStateAction<TLoginResponse>>;
};