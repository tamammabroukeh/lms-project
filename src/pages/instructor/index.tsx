import InstructorCourses from "@/components/instructor-view/courses";
import LanguageSelector from "@/components/LanguageSelector";
import { Flex } from "@/components/Reusable-Components";
// import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { AuthContext } from "@/context/auth-context";
// import { InstructorContext } from "@/context/instructor-context";
import { useAuthContext } from "@/hooks/auth/useAuth";
import useLogout from "@/hooks/auth/useLogout";
import useGetAllCourses from "@/hooks/course/useGetAllCourses";
import { BarChart, Book, LogOut } from "lucide-react";
import { useState } from "react";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logoutHandler } = useLogout();
  const { setAuth } = useAuthContext();
  const {data,error,isError,isFetching,isLoading,isSuccess} = useGetAllCourses()
  console.log("error",error)
  console.log("isError",isError)
  console.log("isFetching",isFetching)
  console.log("isLoading",isLoading)
  console.log("isSuccess",isSuccess)

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      // component: <InstructorDashboard listOfCourses={data} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={data} />,
    },
    {
      icon: LogOut,
      label: "Logout",
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
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
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
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Flex classes="items-start justify-between">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <LanguageSelector />
          </Flex>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
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
