// src/hooks/course/useGetAllCourses.ts
import { useFetchData, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseRoute } from "@/api/routes";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const useGetAllCourses = () => {
  const { t } = useTypedTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState<number>(Number(currentPage) || 1);
  
  const { data, isError, error, isFetching, isLoading, isSuccess } = useFetchData({
    queryKey: ["getCourses", page], // Add page to queryKey
    queryFn: () => axios.get(`${courseRoute}?page=${page}`), // Add page to API request
    keepPreviousData: true,
    onSuccessFn(data) {
      console.log("get courses", data);
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
  });

  // Generate pages array based on total pages from API response
  const totalPages = data?.data?.totalPages || 1;
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return {
    error,
    data,
    isError,
    isFetching,
    isLoading,
    pagesArray,
    isSuccess,
    searchParams,
    setSearchParams,
    page,
    setPage,
    t
  };
};

export default useGetAllCourses;