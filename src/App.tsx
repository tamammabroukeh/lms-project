import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { useLanguageDirection } from "./hooks/language/useLanguageDirection";
import PersistLogin from "./utils/PersistLogin";
import AuthLayout from "./layouts/AuthLayout";
import SuspenseFallback from "./components/feedback/SuspenseFallback";
// import RGlobalLoader from './RComponents/RGlobalLoader/RGlobalLoader';

// Lazy-loaded components
const StudentViewCommonLayout = lazy(
  () => import("./components/student-view/common-layout")
);
const AuthPage = lazy(() => import("./pages/auth"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));
const InstructorDashboardpage = lazy(() => import("./pages/instructor"));
const AddNewCoursePage = lazy(
  () => import("./pages/instructor/add-new-course")
);
const StudentHomePage = lazy(() => import("./pages/student/home"));
const StudentViewCoursesPage = lazy(() => import("./pages/student/courses"));
const StudentViewCourseDetailsPage = lazy(
  () => import("./pages/student/course-details")
);
const PaypalPaymentReturnPage = lazy(
  () => import("./pages/student/payment-return")
);
const StudentCoursesPage = lazy(
  () => import("./pages/student/student-courses")
);
const StudentViewCourseProgressPage = lazy(
  () => import("./pages/student/course-progress")
);
const NotFoundPage = lazy(() => import("./pages/not-found"));

function App() {
  useLanguageDirection();
  const router = createBrowserRouter([
    // Home route (public)

    // Auth route
    {
      path: "/auth",
      element: (
        // <SuspenseFallback>
        <AuthLayout />
        // </SuspenseFallback>
      ),
      children: [
        {
          index: true,
          element: <AuthPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "reset-password",
          element: <ResetPasswordPage />,
        },
      ],
    },

    {
      element: <PersistLogin />,
      children: [
        {
          path: "/",
          element: (
            // <SuspenseFallback>
            <StudentViewCommonLayout />
            // </SuspenseFallback>
          ),
          children: [
            {
              index: true,
              element: <StudentHomePage />,
            },
            {
              path: "home",
              element: <StudentHomePage />,
            },
          ],
        },
        // Instructor routes
        {
          path: "/instructor",
          element: (
            <SuspenseFallback>
              <InstructorDashboardpage />
            </SuspenseFallback>
          ),
        },
        {
          path: "/instructor/create-new-course",
          element: (
            <SuspenseFallback>
              <AddNewCoursePage />
            </SuspenseFallback>
          ),
        },
        {
          path: "/instructor/edit-course/:courseId",
          element: (
            <SuspenseFallback>
              <AddNewCoursePage />
            </SuspenseFallback>
          ),
        },

        // Protected student routes
        {
          element: (
            // <SuspenseFallback>
            <StudentViewCommonLayout />
            // </SuspenseFallback>
          ),
          children: [
            { path: "courses", element: <StudentViewCoursesPage /> },
            {
              path: "course/details/:id",
              element: <StudentViewCourseDetailsPage />,
            },
            { path: "payment-return", element: <PaypalPaymentReturnPage /> },
            { path: "student-courses", element: <StudentCoursesPage /> },
            {
              path: "course-progress/:id",
              element: <StudentViewCourseProgressPage />,
            },
          ],
        },
      ],
    },

    // Not found route
    {
      path: "*",
      element: (
        <SuspenseFallback>
          <NotFoundPage />
        </SuspenseFallback>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider
        router={router}
        // fallbackElement={<RGlobalLoader />}
      />
    </>
  );
}

export default App;
