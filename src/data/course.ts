import {
  ISignFormControls,
} from "@/interfaces";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
import { IinitialResetPassFormData } from "@/interfaces/auth";
import { IinitialCourseFormData } from "@/interfaces/course";
export default function CourseData(t: TypedTFunction, param?: string) {
  const createCourseContentFormControls: ISignFormControls[] = [
    {
      // name: "title.en",
      label: t("course:lecture_title_in_english"),
      placeholder: t("course:lecture_placholder_title_in_english"),
      type: "text",
    },
    {
      // name: "title.ar",
      label: t("course:lecture_title_in_arabic"),
      placeholder: t("course:lecture_placholder_title_in_arabic"),
      type: "text",
    },
  ];

  const initialResetPassFormData: IinitialResetPassFormData = {
    newPassword: "",
    userEmail: param ?? "",
    resetCode: "",
  };

  return {
    initialResetPassFormData,
    createCourseContentFormControls
  };
}

export const courseContentInitialObj:IinitialCourseFormData = {
      titleCourseEN: "",
      titleCourseAR: "",
      category:"",
      level:"",
      primaryLanguage:"",
      subtitleCourseAR: "",
      subtitleCourseEN: "",
      descriptionAR: "",
      descriptionEN: "",
      price: 0,
      objectivesAR: "",
      objectivesEN: "",
      welcomeMessageAR: "",
      welcomeMessageEN: "",
      coverImage:{
        url: "",
        resourceType: "",
        public_id: "",
      },
      lectures: [],
  };

export const courseCurriculumInitialFormData:IinitialCourseFormData[] = [courseContentInitialObj];