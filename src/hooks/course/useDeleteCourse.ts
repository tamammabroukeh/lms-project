import { useMutateData, useTypedTranslation } from "@/hooks";
import axios from "@/api/axiosInstance";
import { deleteCourseRoute } from "@/api/routes";
import { useState } from "react";
import { useQueryClient } from "react-query";
const useDeleteCourse = () => {
  const { t } = useTypedTranslation();
  const [courseId, setCourseId] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const createCourseMutation = useMutateData({
    mutationFn: () =>
      axios.delete(`${deleteCourseRoute}/${courseId}`),
    onSuccessFn(data, variables) {
      console.log("data from on success", data);
      queryClient.invalidateQueries({queryKey:["getCourses"]})
      setOpen(false)
      console.log("variables from on success", variables);
    },
  });

  const submitHandler = async () => {
    // const formData = objToFormData(data);
    await createCourseMutation.mutateAsync({});
  };

  return {
    error: createCourseMutation.error,
    isError: createCourseMutation.isError,
    isLoading: createCourseMutation.isLoading,
    isSuccess: createCourseMutation.isSuccess,
    submitHandler,
  courseId, setCourseId,t,open,setOpen
  };
};

export default useDeleteCourse;