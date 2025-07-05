import { ReusableButton } from "@/components/Reusable-Components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VideoPlayer from "@/components/video-player";
import { useCurrentLangIsEnglish } from "@/hooks";
import { useAuthContext } from "@/hooks/auth/useAuth";
import useGetCheckCoursePurchaseInfo from "@/hooks/course/useGetCheckCoursePurchaseInfo";
import useGetCourseById from "@/hooks/course/useGetCourseById";
import useCreateOrder from "@/hooks/order/useCreateOrder";
import { ICourseLecture } from "@/interfaces/course";
import LoadingSpinner from "@/shared/LoadingSpinner";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const isEnglish = useCurrentLangIsEnglish()
  const { auth } = useAuthContext();
  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState("");
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data, isFetching, isLoading } = useGetCourseById()
  const { data: checkCourse } = useGetCheckCoursePurchaseInfo()
  const { submitHandler, isLoading: isLoadingOrder } = useCreateOrder()
  console.log("checkCourse", checkCourse)
  useEffect(() => {
    if (
      checkCourse?.data?.purchased
    ) {
      navigate(`/course-progress/${courseId}`);
    }
  }, [])

  function handleSetFreePreview(getCurrentVideoInfo: ICourseLecture) {
    console.log(getCurrentVideoInfo);
    setShowFreePreviewDialog(true);
    if (getCurrentVideoInfo?.freePreview)
      setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.userData?._id,
      userName: auth?.userData?.userName,
      userEmail: auth?.userData?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: data?.data?.instructorId,
      instructorName: data?.data?.instructorName,
      courseImage: data?.data?.image,
      courseTitle: data?.data?.title,
      courseId: data?.data?._id,
      coursePricing: data?.data?.pricing,
    };
    submitHandler(paymentPayload)
  }
  if (isFetching || isLoading) return <LoadingSpinner />;

  const getIndexOfFreePreviewUrl =
    data?.data !== null
      ? data?.data?.curriculum?.findIndex(
        (item: ICourseLecture) => item.freePreview
      )
      : -1;
  return (
    <div className=" mx-auto p-4">
      <div className="bg-slate-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {data?.data?.title}
        </h1>
        <p className="text-xl mb-4">{data?.data?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {data?.data?.instructorName}</span>
          {/* <span>Created On {data?.data?.date.split("T")[0]}</span> */}
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {data?.data?.primaryLanguage}
          </span>
          <span>
            {data?.data?.students.length}{" "}
            {data?.data?.students.length <= 1
              ? "Student"
              : "Students"}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data?.data?.objectives?.length > 0 && data?.data?.objectives
                  ?.split(",")
                  .map((objective: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{data?.data?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.data?.curriculum?.map(
                (curriculumItem: ICourseLecture) => (
                  <li
                    className={`${curriculumItem?.freePreview
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                      } flex items-center mb-4`}
                    onClick={
                      () => handleSetFreePreview(curriculumItem)
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{isEnglish ? curriculumItem?.title?.en : curriculumItem?.title?.ar}</span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  onProgressUpdate={{}}
                  progressData={{}}
                  url={
                    getIndexOfFreePreviewUrl !== -1
                      ? data?.data?.curriculum[
                        getIndexOfFreePreviewUrl
                      ].videoUrl
                      : ""
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${data?.data?.pricing}
                </span>
              </div>
              <ReusableButton
                isLoading={isLoadingOrder}
                btnText="Buy Now"
                className="w-full"
                onClick={handleCreatePayment}
              />
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview("");
        }}
      >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              onProgressUpdate={{}}
              progressData={{}}
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {data?.data?.curriculum
              ?.filter((item: ICourseLecture) => item.freePreview)
              .map((filteredItem: ICourseLecture) => (
                <p
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {isEnglish ? filteredItem?.title?.en : filteredItem?.title?.ar}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default StudentViewCourseDetailsPage;
