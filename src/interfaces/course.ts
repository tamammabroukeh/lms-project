import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormReturn } from "react-hook-form";
import { ISignFormControls } from "./components/Form";
import { Dispatch, SetStateAction } from "react";
import { CreateCourseType } from "@/schemas/CreateCourseSchema";
import { CreateCourseContentType } from "@/schemas";
export interface ICourseLectures {
    lectures:ICourseLecture[];
    currentLecture:ICourseLecture;
    setCurrentLecture: (value: SetStateAction<ICourseLecture>) => void;
    isOpen:boolean;
    isReplacing:boolean
    setIsOpen:(value: boolean) => void
    files:never[]
    setFiles:Dispatch<SetStateAction<never[]>>
    handleAddDataToList: (data: any) => void
    handleAddLecture: () => void
    isCurrentLectureValid: () => string | false
    handleReplaceVideo: (index: number) => void
    replacingIndex: number | null
    handleDeleteLecture: (index: number) => void
    handleCancelReplace:() => void
    getParam:(key: string) => string | null
    isLoadingCancel:boolean
}
export interface ICourseDetails {
    form:UseFormReturn<CreateCourseType>
    categories:any;
    levels:any
}
export interface ICourseCover {
    isLoading:boolean;
    lectureLength:number
    form:UseFormReturn<CreateCourseType>
    handleCoverImageUpload: (file: File) => void
    coverImagePreview: string;
    image: {
        url: string;
        resourceType: string;
        public_id: string;
    };
    isOpen:boolean;
    setIsOpen:(value: boolean) => void    
    files:never[]
    setFiles:Dispatch<SetStateAction<never[]>>
    isLoadingCancel:boolean
    handleDeleteImage:() => void
    findLevel:ILevel;
    findCategory:ICategory;
}
export interface ICourseLecture {
    videoUrl: string;
    lectureTitleAR: string;
    lectureTitleEN: string;
    public_id?: string | undefined;
    freePreview?: boolean | undefined;
    resource_type?: string | undefined;
}
export interface IinitialCourseFormData {
      titleCourseAR: string,
      titleCourseEN: string,
      category: string,
      level: string,
      primaryLanguage: string,
      subtitleCourseAR: string,
      subtitleCourseEN: string,
      descriptionAR: string,
      descriptionEN: string,
      price: 0,
      objectivesAR: string,
      objectivesEN: string,
      welcomeMessageAR: string,
      welcomeMessageEN: string,
      coverImage:{
        url: string,
        resourceType: string,
        public_id: string,
      }
      lectures: CreateCourseContentType[],
}

export interface ICourseCurriculum<T extends FieldValues> {
    inputs: ISignFormControls[];
    form:UseFormReturn<T>;
    // errors: FieldErrors<T>
    errors: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{
        title: {
            ar: string;
            en: string;
        };
        videoUrl: string;
        public_id: string;
        freePreview: NonNullable<boolean | undefined>;
    }>> | undefined)[]> | undefined

}
// category
export interface ICategory{
    _id:string;
    description: {en:string; ar:string} | string;
    title: {en:string; ar:string};
    // title: {en:string; ar:string} | string;
    displayOrder: number
    isFeatured: boolean
}
// levels
export interface ILevel{
    _id:string;
    title: { en:string; ar:string };
}