import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { checkCoursePurchaseInfoRoute } from "@/api/routes";
import { useParams } from "react-router-dom";
const useGetCheckCoursePurchaseInfo = () => {
  const { courseId } = useParams()
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
	queryKey: ["checkCoursePurchaseInfo"],
    queryFn: () => axios.get(`${checkCoursePurchaseInfoRoute}/${courseId}`),
    onSuccessFn(data) {
      console.log("get courses", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
    enableCondition:!!courseId
  });
  
  return {
    error,data,
    isError,isFetching,
    isLoading,
    isSuccess,
  };
};
export default useGetCheckCoursePurchaseInfo;
