import { useMutateData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { resetCourseProgressRoute } from "@/api/routes";
import { useQueryClient } from "react-query";
const useResetCourseProgress = (id:any, setCurrentLecture:any, setShowConfetti:any, setShowCourseCompleteDialog:any) => {
  const queryClient = useQueryClient()

  const resetCourseProgressMutation = useMutateData({
    mutationFn: () =>
      axios.patch(`${resetCourseProgressRoute}/${id}`),
    onSuccessFn(data) {
      console.log("data from on success", data);
      setCurrentLecture(null), setShowConfetti(false), setShowCourseCompleteDialog(false)
      queryClient.invalidateQueries({ queryKey:["getCurrentCourseProgress"] })
    },
  });

  const submitHandler = () => {
    resetCourseProgressMutation.mutateAsync({})
  }

  return {
    error: resetCourseProgressMutation.error,
    isError: resetCourseProgressMutation.isError,
    isLoading: resetCourseProgressMutation.isLoading,
    isSuccess: resetCourseProgressMutation.isSuccess,
    submitHandler,
  };
};

export default useResetCourseProgress;