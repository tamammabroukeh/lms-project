// import { courseCategories } from "@/config";
import banner from "../../../../public/banner-img.png";
// import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useTypedTranslation } from "@/hooks";
import { ICourse } from "@/interfaces/course";
import Course from "../courses/course";
import ReusablePagination from "@/components/Reusable-Components/Reusable-Pagination";
import useGetAllCoursesNoRole from "@/hooks/course/useGetAllCoursesNoRole";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteFooter } from "@/components/shared/Footer";

function StudentHomePage() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTypedTranslation()
  // function handleNavigateToCoursesPage(getCurrentId: string) {
  //   console.log(getCurrentId);
  //   sessionStorage.removeItem("filters");
  //   const currentFilter = {
  //     category: [getCurrentId],
  //   };
  //   sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  //   navigate("/courses");
  // }
  const { data, setPage, page, searchParams, setSearchParams } = useGetAllCoursesNoRole()
  console.log("data", data)
  console.log("page", page)
  console.log("auth", auth)

  function handleCourseNavigate(getCurrentCourseId: string) {
    navigate(`/course/details/${getCurrentCourseId}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">{t("course:learning_that_gets_you")}</h1>
          <p className="text-xl">
            {t("course:skills_for_your_present_and_your_future_Get_Started_with_US")}
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">{t("course:featured_courses")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data && data?.data?.courses && data?.data?.courses?.length > 0 ? (
            data?.data?.courses?.map((course: ICourse) => (
              <Course {...{ course }} onClick={() => handleCourseNavigate(course?._id)} />
            ))
          ) : (
            [0, 1, 2, 3].map(num =>
              <Skeleton className="w-72 h-72" key={num} />
            )
          )}
        </div>
        {data?.data?.courses?.length > 0 && <ReusablePagination
          currentPage={data?.data.currentPage}
          totalPages={data?.data?.totalPages}
          setPage={setPage}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        }
      </section>
      <SiteFooter />
      {/* <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section> */}
    </div>
  );
}

export default StudentHomePage;
