import { ReusableButton, ReusableCard , ReusableDialog ,Flex } from "@/components/Reusable-Components";
import FileUploader from "@/components/shared/FileUploader";
import { Label } from "@/components/ui/label";
import { useCurrentLangIsEnglish, useTypedTranslation } from "@/hooks";
import { ICourseCover } from "@/interfaces/course";
import { Trash2, Upload } from "lucide-react";

export default function CourseCover({findCategory,findLevel,files, setFiles, isOpen, setIsOpen, image, form, isLoading, lectureLength, handleCoverImageUpload,handleDeleteImage, isLoadingCancel }: ICourseCover) {
    const currentLang = useCurrentLangIsEnglish()
    const {t} = useTypedTranslation()
    console.log("img", image)
    return (
        <ReusableCard
            title={t("course:cover_image_submit")}
            titleStyle="text-3xl font-bold text-blue-950"
            styleForCard="shadow-lg"
            styleForContent="space-y-4"
        >
            <div className="text-center">
                <Label>{t("course:course_cover_image")}</Label>
                <ReusableDialog
                    isOpen={isOpen}
                    {...{ setIsOpen }}
                    triggerComponent={
                        <div
                            onClick={() => setIsOpen(true)}
                            className="mt-2">
                            <label htmlFor="cover-upload">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                                    {image && image.url ? (
                                        <Flex>
                                            <img
                                                src={image.url}
                                                alt="Cover preview"
                                                className="mx-auto rounded-lg shadow-md"
                                            />
                                        </Flex>
                                    ) : (
                                        <>
                                            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                            <p className="text-lg text-gray-600 mb-2">{t("course:click_to_upload_cover_image")}</p>
                                            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>
                    }
                    dialogBody={
                        // @ts-ignore
                        <FileUploader singleFile={true} typeFile={{"image/*":[]}}
                            parentCallback={setFiles}
                            parentFiles={files}
                            handleCloseUploadFile={() => setIsOpen(false)}
                            parentCallbackToFillData={(data: any) => handleCoverImageUpload(data)} />
                    }
                    contentClassName="max-w-[450px] max-h-screen overflow-auto"
                />
                {image && image.url && <ReusableButton
                    btnText=""
                    isLoading={isLoadingCancel}
                    onClick={() => handleDeleteImage()}
                    variant="destructive"
                    className="mt-2"
                    type="button"
                >
                    {!isLoadingCancel && <Trash2 className="w-4 h-4" />}
                </ReusableButton>}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{t("course:course_summary")}</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>{t("course:lectures")}:</strong> {lectureLength} {t("course:lectures_added")}</p>
                    <p><strong>{t("course:title")}:</strong> {form.watch('titleCourseEN') || (currentLang ? 'Not set' : "لم يتم اختياره")}</p>
                    <p><strong>{t("course:category")}:</strong> {form.watch("category") || (currentLang ? 'Not set' : "لم يتم اختياره")}</p>
                    {/* <p><strong>{t("course:category")}:</strong> {(currentLang ? findCategory?.title?.en : findCategory?.title?.ar) || currentLang ? 'Not set' : "لم يتم اختياره"}</p> */}
                    <p><strong>{t("course:level")}:</strong> {form.watch("level") || (currentLang ? 'Not set' : "لم يتم اختياره")}</p>
                    {/* <p><strong>{t("course:level")}:</strong> {(currentLang ? findLevel?.title?.en : findLevel?.title?.ar) || currentLang ? 'Not set' : "لم يتم اختياره"}</p> */}
                    <p><strong>{t("course:price")}:</strong> ${form.watch('price') || 0}</p>
                </div>
            </div>

            <ReusableButton
                {...{ isLoading }}
                type="submit"
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading || lectureLength === 0}
                btnText={t("course:create_course")}
            />
        </ReusableCard>
    )
}