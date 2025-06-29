import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseLevelsRoute } from "@/api/routes";
import { useLocation } from "react-router-dom";
const useGetCourseLevels = () => {
  const location = useLocation()
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
	  queryKey: ["getCourseLevels"],
    queryFn: () => axios.get(courseLevelsRoute).then(res => res.data),
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
    error,
    data,
    isError,isFetching,
    isLoading,
    isSuccess,
  };
};
export default useGetCourseLevels;
