import { useFetchData, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseRoute } from "@/api/routes";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const useGetAllCoursesNoRole = () => {
  const {t} = useTypedTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get("page")
  const [page, setPage] = useState<number>(Math.max(1, Number(currentPage || '1')));
  const {data, isError, error, isFetching, isLoading, isSuccess} = useFetchData({
    queryKey: ["getCoursesNoRole", page], // dynamic queryKey
    queryFn: () => axios.get(`${courseRoute}/all-filter?sortBy=title-atoz&page=${page}`), // pass page param
    keepPreviousData: true,
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
