import { useMutateData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { markLectureRoute } from "@/api/routes";
import React from "react";
import { useQueryClient } from "react-query";
const useMarkLecture = (currentLecture:any, studentCurrentCourseProgress:any) => {
  const queryClient = useQueryClient()

  const markLectureMutation = useMutateData({
    mutationFn: (data) =>
      axios.post(markLectureRoute, data),
    onSuccessFn(data) {
      console.log("data from on success", data);
      queryClient.invalidateQueries({ queryKey:["getCurrentCourseProgress"] })
    },
  });
  
  const submitHandler = () => {
    markLectureMutation.mutateAsync({lectureId:currentLecture?._id, courseId:studentCurrentCourseProgress?.courseDetails?._id})
  }
  
  React.useEffect(() => {
      if (currentLecture?.progressValue === 1) submitHandler();
    }, [currentLecture]);

  return {
    error: markLectureMutation.error,
    isError: markLectureMutation.isError,
    isLoading: markLectureMutation.isLoading,
    isSuccess: markLectureMutation.isSuccess,
    submitHandler,
  };
};

export default useMarkLecture;