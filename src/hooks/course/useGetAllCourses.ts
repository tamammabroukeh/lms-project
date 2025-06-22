import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { studentCoursesRoute } from "@/api/routes";
import { useLocation } from "react-router-dom";
const useGetAllCourses = () => {
  const location = useLocation()
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
		queryKey: ["getStudentCourses"],
    queryFn: () => axios.get(studentCoursesRoute),
    keepPreviousData:true,
    onSuccessFn(data) {
      console.log("data from on success", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
		enableCondition: location.pathname.includes("course"),

  });

  return {
    error,data,
    isError,isFetching,
    isLoading,
    isSuccess,
  };
};
export default useGetAllCourses;
