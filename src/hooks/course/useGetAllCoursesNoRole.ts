import { useFetchData, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { coursesRoute } from "@/api/routes";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const useGetAllCoursesNoRole = () => {
  const {t} = useTypedTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryString = searchParams.toString();
  const currentPage = searchParams.get("page")
  const [page, setPage] = useState<number>(Math.max(1, Number(currentPage || '1')));
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
		queryKey: ["getCoursesNoRole", page, queryString],
    queryFn: () => axios.get(`${coursesRoute}?${queryString}`),
    keepPreviousData:true,
    onSuccessFn(data) {
      console.log("get courses", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
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
export default useGetAllCoursesNoRole;