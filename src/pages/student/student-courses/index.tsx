import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentLangIsEnglish } from "@/hooks";
import useGetAllCourses from "@/hooks/course/useGetAllCourses";
import { Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllCourses()
  console.log("data", data)
  const isEnglish = useCurrentLangIsEnglish()
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {!isFetching ? (
          data?.data?.courses.map((course: any) => (
            <Card key={course._id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.image}
                  alt={isEnglish ? course?.title?.en : course?.title?.ar}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{isEnglish ? course?.title?.en : course?.title?.ar}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?._id}`)
                  }
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          [0, 1, 2, 3].map(num =>
            <Skeleton className="w-72 h-72" key={num} />
          )
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;
