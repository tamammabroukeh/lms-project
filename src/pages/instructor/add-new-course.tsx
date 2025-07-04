import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { ReusableButton, ReusableTabs } from "@/components/Reusable-Components";
import useCreateCourse from "@/hooks/course/useCreateCourse";
import CourseCover from "@/components/instructor-view/courses/add-new-course/course-cover";
import CourseLectures from "@/components/instructor-view/courses/add-new-course/course-lectures";
import CourseDetails from "@/components/instructor-view/courses/add-new-course/course-details";
const AddNewCoursePage = () => {
  const { activeTab, handleTabChange, t, form, navigate, submitHandler, isLoading, files, handleAddDataToList, handleAddLecture, handleCancelReplace, handleCoverImageUpload, handleDeleteLecture, handleReplaceVideo, isOpen, setFiles, currentLecture, lectures, isCurrentLectureValid, isReplacing, replacingIndex, setCurrentLecture, setIsOpen, getParam, isLoadingCancel, image, handleDeleteImage, categories, levels, findLevel, findCategory, errors, isLoadingEdit } = useCreateCourse()
  console.log("current lecture", currentLecture)
  console.log("lecture", lectures)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <ReusableButton variant={"link"} btnText={t("course:back_to_dashboard")} isLoading={false} onClick={() => navigate("/instructor")} className="bg-blue-500 text-white rounded-lg px-3 py-2">
          <ArrowLeft />
        </ReusableButton>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-950 mb-2">{t("course:create_Your_Course")}</h1>
          <p className="text-lg text-gray-600">{t("course:create_and_manage_your_course_content")}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
            <ReusableTabs
              styleForTabList="grid w-full !h-14 grid-cols-3 mb-8"
              styleForTabTrigger="text-lg py-3"
              styleForTab="w-full"
              value={activeTab}
              defaultValue="lectures"
              onValueChange={handleTabChange}
              tabTriggerValues={[
                { title: t("course:content"), value: "lectures" },
                { title: t("course:course_information"), value: "details" },
                { title: t("course:course_cover_image"), value: "cover" },
              ]}
              tabContentValues={[
                {
                  value: "lectures",
                  children: <CourseLectures {...{ isLoadingCancel, getParam, currentLecture, files, handleAddDataToList, handleAddLecture, handleCancelReplace, handleDeleteLecture, handleReplaceVideo, isCurrentLectureValid, isOpen, isReplacing, lectures, replacingIndex, setCurrentLecture, setFiles, setIsOpen }} />
                },
                {
                  value: "details",
                  children: <CourseDetails {...{ errors, categories, levels, form }} />
                },
                {
                  value: "cover",
                  children: <CourseCover
                    {...{ findLevel, findCategory, handleDeleteImage, isLoadingCancel, files, setFiles, isOpen, setIsOpen, image, form, handleCoverImageUpload, isLoading, isLoadingEdit }}
                    lectureLength={lectures.length}
                  />
                },
              ]}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewCoursePage;
