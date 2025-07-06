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
import { DollarSign, Users } from "lucide-react";

// @ts-ignore
function InstructorDashboard({ listOfCourses }) {
  console.log("list, ", listOfCourses)
  const { t } = useTypedTranslation();
  function calculateTotalStudentsAndProfit() {
    const result = listOfCourses?.courses?.reduce(
      // @ts-ignore
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        // @ts-ignore
        course.students.forEach((student) => {
          acc.studentList.push({
            courseTitle: course.title.en,
            studentName: student.userName,
            studentEmail: student.userEmail,
            studentGender: student.gender,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );
    return result
  }

  console.log("calculateTotalStudentsAndProfit", calculateTotalStudentsAndProfit());

  const config = [
    {
      icon: Users,
      label: t("course:total_students"),
      value: calculateTotalStudentsAndProfit()?.totalStudents,
    },
    {
      icon: DollarSign,
      label: t("course:total_revenue"),
      value: calculateTotalStudentsAndProfit()?.totalProfit,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("course:students_list")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("course:course_title")}</TableHead>
                  <TableHead>{t("course:student_name")}</TableHead>
                  <TableHead>{t("course:student_email")}</TableHead>
                  <TableHead>{t("course:student_gender")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculateTotalStudentsAndProfit()?.studentList.map(
                  // @ts-ignore
                  (studentItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {studentItem.courseTitle}
                      </TableCell>
                      <TableCell>{studentItem.studentName}</TableCell>
                      <TableCell>{studentItem.studentEmail}</TableCell>
                      <TableCell>{studentItem.studentGender}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructorDashboard;
