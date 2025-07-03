import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import LanguageSelector from "@/components/LanguageSelector";
import { Flex, ReusableButton } from "@/components/Reusable-Components";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useAuthContext } from "@/hooks/auth/useAuth";
import useLogout from "@/hooks/auth/useLogout";
import useGetAllCourses from "@/hooks/course/useGetAllCourses";
import { BarChart, Book, LogOut } from "lucide-react";
import { useState } from "react";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logoutHandler, isLoading } = useLogout();
  const { setAuth } = useAuthContext();
  const { data, isFetching, t } = useGetAllCourses()

  const menuItems = [
    {
      icon: BarChart,
      label: t("course:dashboard"),
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={data?.data} />,
    },
    {
      icon: Book,
      label: t("course:courses"),
      value: "courses",
      component: <InstructorCourses listOfCourses={data?.data} />,
    },
    {
      icon: LogOut,
      label: t("auth:signout"),
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    logoutHandler();
    sessionStorage.clear();
    localStorage.clear();
    setAuth(null);
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{t("course:instructor_view")}</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <ReusableButton
                btnText={menuItem.label}
                isLoading={menuItem.value === "logout" && isLoading}
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
              </ReusableButton>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Flex classes="items-start justify-between">
            <h1 className="text-3xl font-bold mb-8">{t("course:dashboard")}</h1>
            <LanguageSelector />
          </Flex>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {isFetching ?

              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <Skeleton className="w-[50%] h-28" />
                  <Skeleton className="w-[50%] h-28" />
                </div>
                <Skeleton className="w-[100%] h-36" />
              </div>

              : menuItems.map((menuItem) => (
                <TabsContent key={menuItem.value} value={menuItem.value}>
                  {menuItem.component !== null ? menuItem.component : null}
                </TabsContent>
              ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
