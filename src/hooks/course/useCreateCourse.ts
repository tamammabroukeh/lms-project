import { CreateCourseContentType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateData, useTypedTranslation, useSearchParams, useGetCourseCategories, useGetCourseLevels } from "@/hooks";
import axios from "@/api/axiosInstance";
import { createCourseRoute, deleteFileAfteruploadingRoute } from "@/api/routes";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { objToFormData } from "@/utils/objToFormData";
import { CreateCourseSchema, CreateCourseType } from "@/schemas/CreateCourseSchema";
import { courseContentInitialObj } from "@/data/course";
import axiosInstance from "@/api/axiosInstance";
import { ICategory, ILevel } from "@/interfaces/course";
const useCreateCourse = () => {
  const { t } = useTypedTranslation();
  const { setParam, getParam } = useSearchParams();
  const navigate = useNavigate();
  // states
  const [activeTab, setActiveTab] = useState("lectures")
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [isReplacing, setIsReplacing] = useState(false);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [originalVideoData, setOriginalVideoData] = useState<any>(null)
  const [currentLecture, setCurrentLecture] = useState<CreateCourseContentType>({
    lectureTitleAR: "",
    lectureTitleEN: "",
    videoUrl: "",
    freePreview: false,
  });

  const createCourseSchema = useMemo(() => CreateCourseSchema(t), [t]);

  function handleTabChange(value: string) {
    setActiveTab(value);
    setIsOpen(false);
  }

  const form = useForm<CreateCourseType>({
    mode: "all",
    resolver: zodResolver(createCourseSchema),
    defaultValues: courseContentInitialObj,
  });


  const handleAddLecture = () => {
    setIsOpen(false)
    if (isCurrentLectureValid()) {
      // setLectures([...lectures, currentLecture]);
      form.setValue("lectures", [...form.getValues().lectures, currentLecture])
      setCurrentLecture({
        lectureTitleAR: "",
        lectureTitleEN: "",
        videoUrl: "",
        resource_type: "",
        freePreview: false,
      });
    }
  };

  const isCurrentLectureValid = () => {
    return currentLecture.lectureTitleAR.trim() !== "" &&
      currentLecture.lectureTitleEN.trim() !== "" &&
      currentLecture.videoUrl;
  };

  const createCourseMutation = useMutateData({
    mutationFn: (data) =>
      axios.post(createCourseRoute, data),
    onSuccessFn(data, variables) {
      console.log("data from on success", data);
      console.log("variables from on success", variables);
      // form.reset();
    },
  });

  const handleDeleteLecture = (index: number) => {
    setParam("button", "delete")
    setParam("index", `${index}`)
    // const { resource_type, public_id } = lectures[index]
    const { resource_type, public_id } = form.getValues().lectures[index]
    cancelUploadMutation.mutate({ public_id, resourceType: resource_type })
  };

  const handleDeleteImage = () => {
    const img = form.getValues().coverImage
    cancelUploadMutation.mutate({ public_id: img?.public_id, resourceType: img?.resourceType, isDeleteImage: true })
  };

  const handleReplaceVideo = (index: number) => {
    setIsReplacing(true);
    setReplacingIndex(index);
    setOriginalVideoData(form.getValues().lectures[index]);
    setIsOpen(true);
    setFiles([]);
  };
  const handleCancelReplace = () => {
    setIsOpen(false);
    setIsReplacing(false);
    setReplacingIndex(null);
    setOriginalVideoData(null);
    setFiles([]);
  };

  const handleConfirmReplace = (newVideoData: any) => {
    if (replacingIndex !== null && originalVideoData) {
      // Delete the old video from cloudinary
      const { resource_type, public_id } = originalVideoData;
      cancelUploadMutation.mutate({
        public_id,
        resourceType: resource_type,
        isReplacing: true,
        newVideoData,
        replacingIndex
      });
    }
  };

  const cancelUploadMutation = useMutateData({
    // @ts-ignore
    mutationFn: ({ public_id, resourceType }) => axiosInstance.delete(`${deleteFileAfteruploadingRoute}/${public_id}?resourceType=${resourceType}`),
    onSuccessFn(data, variables) {
      console.log("data", data)
      // @ts-ignore
      const { isReplacing, newVideoData, replacingIndex: replaceIdx, isDeleteImage } = variables;
      if (isDeleteImage) {
        form.setValue("coverImage", { url: "", public_id: "", resourceType: "" })
      }
      else {
        if (isReplacing && newVideoData && replaceIdx !== undefined) {
          // Replace the video in the lecture
          const updatedLectures = [...form.getValues().lectures];
          const { public_id, resource_type, url } = newVideoData[0];
          updatedLectures[replaceIdx] = {
            ...updatedLectures[replaceIdx],
            videoUrl: url,
            public_id,
            resource_type
          };
          // setLectures(updatedLectures);
          form.setValue("lectures", updatedLectures)

          // Reset replacement state
          setIsReplacing(false);
          setReplacingIndex(null);
          setOriginalVideoData(null);
          setIsOpen(false);
          setFiles([]);
        } else {
          // Regular delete operation
          const idx = +getParam("index")!;
          const button = getParam("button");

          if (button === "delete") {
            const updatedLectures = form.getValues().lectures.filter((_, i) => i !== idx);
            // setLectures(updatedLectures);
            form.setValue("lectures", updatedLectures)
          }
        }
      }
    },
  });

  const handleCoverImageUpload = (file: any) => {
    const { public_id, resource_type, url } = file[0]
    form.setValue('coverImage.url', url);
    form.setValue('coverImage.public_id', public_id);
    form.setValue('coverImage.resourceType', resource_type);
  };

  const handleAddDataToList = (data: any) => {
    const { public_id, resource_type, url } = data[0]
    if (isReplacing) {
      // Handle video replacement
      handleConfirmReplace(data);
    } else {
      // Handle new lecture video
      setCurrentLecture({ ...currentLecture, public_id, videoUrl: url, resource_type });
      setFiles(data);
    }
  };
  // console.log(form.getValues().lectures.map(lecture => ({
  //   videoUrl:lecture.videoUrl,
  //   lectureTitleAR: lecture.lectureTitleAR,
  //   lectureTitleEN: lecture.lectureTitleEN,
  //   freePreview: lecture.freePreview,
  // })))
  // // console.log("errors", form.formState.errors)
  // // console.log("form", form.getValues())
  const submitHandler: SubmitHandler<CreateCourseType> = async (
    data
  ) => {
    console.log("data", data);
    const newData = {
      lectures: data.lectures.map(lecture => ({
        title: {
          en: lecture.lectureTitleEN,
          ar: lecture.lectureTitleAR,
        },
        videoUrl: lecture.videoUrl,
        freePreview: lecture.freePreview
      })),
      title: {
        en: data.titleCourseEN,
        ar: data.titleCourseAR
      },
      category: data.category,
      welcomeMessage: {
        en: data.welcomeMessageEN,
        ar: data.welcomeMessageAR,
      },
      description: {
        en: data.descriptionEN,
        ar: data.descriptionAR
      },
      level: data.level,
      primaryLanguage: data.primaryLanguage,
      subtitle: {
        en: data.subTitleCourseEN,
        ar: data.subTitleCourseAR
      },
      image: data.coverImage.url,
      pricing: data.price,
      objectives: {
        en: data.objectivesEN,
        ar: data.objectivesAR
      },
      isPublished: true,
    }
    console.log("new data", newData)
    // const formData = objToFormData(data);
    const formData = objToFormData(newData);
    await createCourseMutation.mutateAsync(formData);
  };

  const { data: categories } = useGetCourseCategories()
  const { data: levels } = useGetCourseLevels()

  const findLevel = levels?.find((level: ILevel) => level._id === form.getValues().level
  )
  const findCategory = categories?.find((category: ICategory) => category._id === form.getValues().category
  )

  return {
    error: createCourseMutation.error,
    isError: createCourseMutation.isError,
    isLoading: createCourseMutation.isLoading,
    isLoadingCancel: cancelUploadMutation.isLoading,
    isSuccess: createCourseMutation.isSuccess,
    errors: form.formState.errors,
    submitHandler,
    form,
    handleTabChange,
    activeTab,
    t,
    handleAddDataToList,
    handleCoverImageUpload,
    handleCancelReplace,
    handleReplaceVideo,
    handleDeleteLecture,
    handleAddLecture,
    setFiles, setCurrentLecture, setIsOpen,
    isOpen,
    isReplacing,
    files,
    currentLecture, replacingIndex,
    lectures: form.getValues().lectures,
    isCurrentLectureValid,
    coverImagePreview, setCoverImagePreview, getParam,
    image: form.getValues().coverImage!,
    handleDeleteImage,
    navigate,
    categories,
    levels,
    findCategory,
    findLevel
  };
};

export default useCreateCourse;