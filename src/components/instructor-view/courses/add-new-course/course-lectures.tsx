import { ReusableButton, ReusableCard, ReusableDialog } from "@/components/Reusable-Components";
import FileUploader from "@/components/shared/FileUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTypedTranslation } from "@/hooks";
import { ICourseLectures } from "@/interfaces/course";
import { Trash2, Upload, Video } from "lucide-react";
import ReactPlayer from "react-player";

const CourseLectures = ({ files, handleAddDataToList, setFiles, isOpen, isReplacing, setIsOpen, setCurrentLecture, currentLecture, lectures, handleAddLecture, handleCancelReplace, handleDeleteLecture, handleReplaceVideo, isCurrentLectureValid, replacingIndex, getParam, isLoadingCancel
}: ICourseLectures) => {
  const { t } = useTypedTranslation()
  return (
    <>
      <ReusableCard
        title={t("course:add_new_lecture")}
        titleStyle="text-3xl font-bold text-blue-950"
        styleForCard="shadow-lg"
        styleForContent="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lectureNameArabic">{t("course:lecture_title_in_arabic")}</Label>
            <Input
              id="lectureNameArabic"
              value={currentLecture.lectureTitleAR}
              onChange={(e) => setCurrentLecture({ ...currentLecture, lectureTitleAR: e.target.value })}
              placeholder={t("course:lecture_title_in_arabic")}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lectureNameEnglish">{t("course:lecture_title_in_english")}</Label>
            <Input
              id="lectureNameEnglish"
              value={currentLecture.lectureTitleEN}
              onChange={(e) => setCurrentLecture({ ...currentLecture, lectureTitleEN: e.target.value })}
              placeholder={t("course:lecture_title_in_english")}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            checked={currentLecture.freePreview}
            onCheckedChange={(checked) => setCurrentLecture({ ...currentLecture, freePreview: checked })}
          />
          <Label>{t("course:free_lecture")}</Label>
        </div>

        <div>
          <Label>{t("course:upload_video")}</Label>
          {!currentLecture.videoUrl && <ReusableDialog
            isOpen={isOpen && !isReplacing}
            {...{ setIsOpen }}
            triggerComponent={
              <div
                onClick={() => setIsOpen(true)}
                className="mt-2">
                <label htmlFor="video-upload-current">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <Video className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{t("course:click_to_upload_video")}</p>
                  </div>
                </label>
              </div>
            }
            dialogBody={
              // @ts-ignore
              <FileUploader singleFile={true}
                typeFile={{ "video/*": [] }}
                parentCallback={setFiles}
                parentFiles={files}
                handleCloseUploadFile={() => setIsOpen(false)}
                parentCallbackToFillData={(data: any) => handleAddDataToList(data)} />
            }
            contentClassName="max-w-[450px] max-h-screen overflow-auto"
          />}

        </div>

        {currentLecture.videoUrl && (
          <div className="space-y-3">
            <ReactPlayer
              url={currentLecture.videoUrl}
              controls
              width="100%"
              height="300px"
              className="rounded-lg overflow-hidden"
            />
          </div>
        )}
        <ReusableButton
          isLoading={false}
          btnText="Add Lecture"
          onClick={handleAddLecture}
          className="w-full bg-blue-700"
          disabled={!isCurrentLectureValid()}
          type="button"
        />
        {/* Existing Lectures */}
        {lectures.map((lecture, index) => {
          console.log("lecture", lecture)
          return <ReusableCard
            styleForCard="shadow-lg"
            titleStyle="text-xl"
            headerStyle="!p-5"
            styleForContent="space-y-4"
            key={index}
            title={
              <>
                Lecture {index + 1}: {lecture.lectureTitleEN}
                {lecture.freePreview ? (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {t("course:free")}
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {t("course:paid")}
                  </span>
                )}
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("course:arabic_title")}</Label>
                <p className="text-sm text-gray-600 mt-1">{lecture.lectureTitleAR ?? lecture.title?.ar}</p>
              </div>
              <div>
                <Label>{t("course:english_title")}</Label>
                <p className="text-sm text-gray-600 mt-1">{lecture.lectureTitleEN ?? lecture.title?.en}</p>
              </div>
            </div>

            {lecture.videoUrl && (
              <div className="space-y-3">
                <ReactPlayer
                  url={lecture.videoUrl}
                  controls
                  width="100%"
                  height="300px"
                  className="rounded-lg overflow-hidden"
                />
                <div className="flex items-center justify-center gap-2">
                  <ReusableButton
                    btnText={t("course:replace_video")}
                    isLoading={isLoadingCancel && replacingIndex === index}
                    onClick={() => handleReplaceVideo(index)}
                    type="button"
                  >
                    <Upload className="w-4 h-4" />
                  </ReusableButton>
                  <ReusableButton
                    btnText={t("course:delete_lecture")}
                    isLoading={isLoadingCancel && getParam("button") === "delete"}
                    onClick={() => handleDeleteLecture(index)}

                    variant="destructive"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </ReusableButton>
                </div>
              </div>
            )}
          </ReusableCard>
        }
        )}
      </ReusableCard>
      {isReplacing && <ReusableDialog
        isOpen={isOpen}
        setIsOpen={handleCancelReplace}
        triggerComponent={
          <div
            onClick={() => setIsOpen(true)}
            className="mt-2">
            <label htmlFor="video-upload-current">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <Video className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">{t("course:click_to_upload_video")}</p>
              </div>
            </label>
          </div>
        }
        dialogBody={
          // @ts-ignore
          <FileUploader
            singleFile={true}
            typeFile={{ "video/*": [] }}
            parentCallback={setFiles}
            parentFiles={files}
            handleCloseUploadFile={handleCancelReplace}
            parentCallbackToFillData={handleAddDataToList}
          />
        }
        contentClassName="max-w-[450px] max-h-screen overflow-auto"
      />
      }
    </>
  );
}

export default CourseLectures;