// src/pages/student/StudentCoursesPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentLangIsEnglish } from "@/hooks";
import useGetAllCourses from "@/hooks/course/useGetAllCourses";
import { Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReusablePagination from "@/components/Reusable-Components/Reusable-Pagination";

function StudentCoursesPage() {
  const navigate = useNavigate();
  const isEnglish = useCurrentLangIsEnglish();
  
  // Use the hook
  const {
    data,
    isFetching,
    page,
    setPage,
    pagesArray,
    searchParams,
    setSearchParams
  } = useGetAllCourses();

  return ( <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isFetching ? (
          // Loading state
          [0, 1, 2, 3].map(num => (
            <Skeleton className="w-full h-80" key={num} />
          ))
        ) : data?.data?.courses?.length > 0 ? (
          // Courses list
          data?.data.courses.map((course: any) => (
            <Card key={course._id} className="flex flex-col h-full">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course.image}
                  alt={isEnglish ? course.title?.en : course.title?.ar}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1 line-clamp-2">
                  {isEnglish ? course.title?.en : course.title?.ar}
                </h3>
                <p className="text-sm text-gray-700 mb-2 truncate">
                  {course.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate(`/course-progress/${course._id}`)}
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          // Empty state
          <div className="col-span-full text-center text-gray-600 py-8">
            You haven't enrolled in any courses yet.
          </div>
        )}
      </div>

      {/* Pagination - Only show if there are multiple pages */}
      {pagesArray.length > 1 && (
        <div className="mt-8">
          <ReusablePagination
            currentPage={page}
            totalPages={pagesArray.length}
            setPage={setPage}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      )}
    </div>
  );
}

export default StudentCoursesPage;