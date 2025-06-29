import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseRoute } from "@/api/routes";
import { useLocation } from "react-router-dom";
const useGetAllCourses = () => {
  const location = useLocation()
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
		queryKey: ["getCourses"],
    queryFn: () => axios.get(courseRoute),
    keepPreviousData:true,
    onSuccessFn(data) {
      console.log("get courses", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
		enableCondition: location.pathname.includes("instructor"),

  });

  return {
    error,data,
    isError,isFetching,
    isLoading,
    isSuccess,
  };
};
export default useGetAllCourses;
