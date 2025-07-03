import ReusableAlertDialog from "@/components/Reusable-Components/Reusable-AlertDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTypedTranslation } from "@/hooks";
import useDeleteCourse from "@/hooks/course/useDeleteCourse";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

// @ts-ignore
function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const { t } = useTypedTranslation();
  console.log("listOfCourses", listOfCourses)
  const { isLoading, submitHandler, setCourseId, open, setOpen } = useDeleteCourse()
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-3xl font-extrabold">{t("course:all_courses")}</CardTitle>
          <Button
            onClick={() => {
              navigate("/instructor/add-new-course");
            }}
            className="p-6"
          >
            {t("course:create_new_course")}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("course:course")}</TableHead>
                  <TableHead className="text-center">{t("course:students")}</TableHead>
                  <TableHead className="text-center">{t("course:revenue")}</TableHead>
                  <TableHead className="text-center">{t("course:actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfCourses?.courses && listOfCourses?.courses?.length > 0
                  ? // @ts-ignore
                  listOfCourses?.courses?.map((course) => (
                    <TableRow key={course?._id}>
                      <TableCell className="font-medium">
                        {course?.title?.en}
                      </TableCell>
                      <TableCell className="text-center">{course?.students?.length}</TableCell>
                      <TableCell className="text-center">
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <ReusableAlertDialog {...{ open, setOpen, isLoading, submitHandler }} triggerComponent={
                          <Button onClick={() => { setOpen(true); setCourseId(course?._id) }} variant="ghost" size="sm">
                            <Delete className="h-6 w-6" />
                          </Button>
                        } />
                      </TableCell>
                    </TableRow>
                  ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default InstructorCourses;