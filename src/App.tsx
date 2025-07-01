import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { useLanguageDirection } from './hooks/language/useLanguageDirection';
import PersistLogin from './utils/PersistLogin';
import AuthLayout from './layouts/AuthLayout';
import SuspenseFallback from './components/feedback/SuspenseFallback';
import RequireAuth from './utils/RequireAuth';
import { ROLES } from './config/roles';
import RoleRedirect from './utils/RoleRedirect';
// import RGlobalLoader from './RComponents/RGlobalLoader/RGlobalLoader';

// Lazy-loaded components
const StudentViewCommonLayout = lazy(() => import('./components/student-view/common-layout'));
const AuthPage = lazy(() => import('./pages/auth'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPassword'));
const InstructorDashboardpage = lazy(() => import('./pages/instructor'));
const AddNewCoursePage = lazy(() => import('./pages/instructor/add-new-course'));
const StudentHomePage = lazy(() => import('./pages/student/home'));
const StudentViewCoursesPage = lazy(() => import('./pages/student/courses'));
const StudentViewCourseDetailsPage = lazy(() => import('./pages/student/course-details'));
const PaypalPaymentReturnPage = lazy(() => import('./pages/student/payment-return'));
const StudentCoursesPage = lazy(() => import('./pages/student/student-courses'));
const StudentViewCourseProgressPage = lazy(() => import('./pages/student/course-progress'));
const NotFoundPage = lazy(() => import('./pages/not-found'));

//Admin
const AdminLayout = lazy(() => import('./components/admin-view/layout/AdminLayout.tsx'));
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard.tsx'));
const AdminUsersPage = lazy(() => import('./pages/admin/users.tsx'));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/analytics.tsx'));
const AdminCoursesPage = lazy(() => import('./pages/admin/courses.tsx'));

function App() {
    useLanguageDirection();
    const router = createBrowserRouter([
        // Home route (public)

        // Auth route
        {
            path: '/auth',
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
                    path: 'forgot-password',
                    element: <ForgotPasswordPage />,
                },
                {
                    path: 'reset-password',
                    element: <ResetPasswordPage />,
                },
            ],
        },

        {
            element: <PersistLogin />,
            children: [
                {
                    path: '/redirect',
                    element: <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Student, ROLES.Teacher]} />,
                    children: [
                        {
                            index: true,
                            element: <RoleRedirect />,
                        },
                    ],
                },
                {
                    path: '/',
                    element: (
                        // <SuspenseFallback>
                        <StudentViewCommonLayout />
                        // </SuspenseFallback>
                    ),
                    children: [
                        {
                            index: true,
                            element: <StudentHomePage />,
                            loader: () => {
                                const token = localStorage.getItem('token');
                                if (token) return <Navigate to="/redirect" replace />;
                                return null;
                            },
                        },
                        {
                            path: 'home',
                            element: <StudentHomePage />,
                        },
                    ],
                },
                // Instructor routes
                {
                    element: <RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Admin]} />,
                    children: [
                        {
                            path: '/instructor',
                            element: (
                                // <SuspenseFallback>
                                <InstructorDashboardpage />
                                // </SuspenseFallback>
                            ),
                        },
                        {
                            path: '/instructor/add-new-course',
                            element: (
                                // <SuspenseFallback>
                                <AddNewCoursePage />
                                // </SuspenseFallback>
                            ),
                        },
                        {
                            path: '/instructor/edit-course/:courseId',
                            element: (
                                <SuspenseFallback>
                                    <AddNewCoursePage />
                                </SuspenseFallback>
                            ),
                        },
                    ],
                },

                // Protected student routes
                {
                    element: <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Student]} />,

                    // element: (
                    //   // <SuspenseFallback>
                    //   <StudentViewCommonLayout />
                    //   // </SuspenseFallback>
                    // ),
                    children: [
                        {
                            element: <StudentViewCommonLayout />,
                            children: [
                                { path: 'courses', element: <StudentViewCoursesPage /> },
                                {
                                    path: 'course/details/:id',
                                    element: <StudentViewCourseDetailsPage />,
                                },
                                { path: 'payment-return', element: <PaypalPaymentReturnPage /> },
                                { path: 'student-courses', element: <StudentCoursesPage /> },
                                {
                                    path: 'course-progress/:id',
                                    element: <StudentViewCourseProgressPage />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // Admin routes (protected by admin role)
        {
            path: '/admin',
            element: (
                // <RequireAuth allowedRoles={[ROLES.ADMIN]}>
                <AdminLayout />
                // </RequireAuth>
            ),
            children: [
                {
                    index: true,
                    element: <AdminDashboardPage />,
                },
                {
                    path: 'users',
                    element: <AdminUsersPage />,
                },
                {
                    path: 'analytics',
                    element: <AdminAnalyticsPage />,
                },
                {
                    path: 'courses',
                    element: <AdminCoursesPage />,
                },
            ],
        },

        // Not found route
        {
            path: '*',
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
