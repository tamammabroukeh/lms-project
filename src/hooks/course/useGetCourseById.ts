import { useFetchData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { courseByIdRoute } from "@/api/routes";
import { useParams } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { CreateCourseType } from "@/schemas/CreateCourseSchema";
const useGetCourseById = (form?:UseFormReturn<CreateCourseType>) => {
  const { courseId } = useParams()
  const {data,isError,error,isFetching,isLoading,isSuccess} = useFetchData({
	queryKey: ["getCourseById"],
    queryFn: () => axios.get(`${courseByIdRoute}/${courseId}`),
    onSuccessFn(data) {
      console.log("get courses", data);
      const { data:course } = data as any
      if(form){
        form.setValue("titleCourseEN", course?.title?.en)
        form.setValue("titleCourseAR", course?.title?.ar)
        form.setValue("category", course?.category?.en)
        form.setValue("level", course?.level?.en)
        form.setValue("descriptionAR", course?.description?.ar)
        form.setValue("descriptionEN", course?.description?.en)
        form.setValue("price", course?.pricing)
        form.setValue("lectures", course?.curriculum?.map((lecture:any) => ({...lecture,lectureTitleAR:lecture?.title?.ar, lectureTitleEN:lecture?.title?.en, public_id:`${lecture?.public_id}`})))
        form.setValue("welcomeMessageAR", course?.welcomeMessage?.ar)
        form.setValue("welcomeMessageEN", course?.welcomeMessage?.en)
        form.setValue("objectivesAR", course?.objectives?.ar)
        form.setValue("objectivesEN", course?.objectives?.en)
        form.setValue("subTitleCourseAR", course?.subtitle?.ar)
        form.setValue("subTitleCourseEN", course?.subtitle?.en)
        form.setValue("primaryLanguage", course?.primaryLanguage)
        form.setValue("coverImage.url", course?.image)
      }
      // form.setValue("coverImage.public_id", course?.image?.public_id)
      // form.setValue("coverImage.resourceType", course?.image?.resourceType)
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
export default useGetCourseById;
