import { useFetchData, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseRoute } from "@/api/routes";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const useGetAllCourses = () => {
  const {t} = useTypedTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get("page")
  const [page, setPage] = useState<number>(Number(currentPage) ?? 1);
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
		queryKey: ["getCourses"],
    queryFn: () => axios.get(`${courseRoute}`),
    keepPreviousData:true,
    onSuccessFn(data) {
      console.log("get courses", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
		// enableCondition: location.pathname.includes("instructor" || "/"),
  });

  let pagesArray: number[];
  pagesArray = Array(page)
    .fill(page)
    .map((_, index) => index + 1);
  
  return {
    error,data,
    isError,isFetching,
    isLoading,pagesArray,
    isSuccess,searchParams, setSearchParams,page, setPage,t
  };
};
export default useGetAllCourses;
