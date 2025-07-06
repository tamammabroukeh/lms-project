import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { currentCourseProgressRoute } from "@/api/routes";
import { useParams } from "react-router-dom";
import React from "react";
const useGetCurrentCourseProgress = () => {
  const [lockCourse, setLockCourse] = React.useState(false);
  const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] = React.useState<any>({})
  const [currentLecture, setCurrentLecture] = React.useState<any>({});
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =React.useState(false);
  const {courseId} = useParams()  
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
	  queryKey: ["getCurrentCourseProgress"],
    queryFn: () => axios.get(`${currentCourseProgressRoute}/${courseId}`).then(res => res.data),
    keepPreviousData:true,
    onSuccessFn(data) {
      console.log("getCurrentCourseProgress success", data);
      if(!data?.data?.isPurchased)
        setLockCourse(true);
      else{
        console.log("studentCurrentCourseProgress",studentCurrentCourseProgress)
        console.log("currentLecture",currentLecture)
        setStudentCurrentCourseProgress({
          courseDetails:data?.data?.courseDetails,
          progress:data?.data?.progress,
        });

        if (data?.data?.completed) {
          setCurrentLecture(data?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);
          return;
        }
        if (data?.progress?.length === 0) {
          setCurrentLecture(data?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = data?.data?.progress.reduceRight(
            (acc:number, obj:any, index:number) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            data?.data?.courseDetails?.curriculum[
            lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    },
    onErrorFn(errorMessage) {
      console.log("errorMessage", errorMessage);
    },
  });

  return {
    error,
    data,
    isError,isFetching,
    isLoading,
    isSuccess,setShowConfetti,setCurrentLecture,setShowCourseCompleteDialog,
    lockCourse, setLockCourse,studentCurrentCourseProgress,currentLecture,showConfetti,showCourseCompleteDialog
  };
};
export default useGetCurrentCourseProgress;