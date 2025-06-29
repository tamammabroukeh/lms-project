import { useTypedTranslation } from "./language/useTypedTranslation";
import { useLanguageDirection } from "./language/useLanguageDirection";
import useCurrentLangIsEnglish from "./language/useCurrentLangIsEnglish";
import { useAuthContext } from "./auth/useAuth";
import useLogin from "./auth/useLogin";
import useForgotPassword from "./auth/useForgotPassword";
import useLogout from "./auth/useLogout";
import useGetCourseCategories from "./course/useGetCourseCategories";
import useResetPassword from "./auth/useResetPassword";
import useLocalStorage from "./useLocalStorage";
import { useMutateData } from "./useMutateData";
import { useFetchData } from "./useFetchData";
import { useSearchParams } from "./useSearchParams";
import useGetCourseLevels from "./course/useGetCourseLevels";

export { useTypedTranslation, useLanguageDirection, useCurrentLangIsEnglish };

export {
  useAuthContext,
  useResetPassword,
  useLogin,
  useForgotPassword,
  useLogout,
};

export { useLocalStorage,useFetchData, useMutateData, useSearchParams };

export { useGetCourseCategories,useGetCourseLevels }