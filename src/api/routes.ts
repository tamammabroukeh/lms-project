// auth
const userRoute = "/user";
const authRoute = "/auth";
const registerRoute = userRoute + authRoute + "/register";
const loginRoute = userRoute + authRoute + "/login";
const logoutRoute = userRoute + "/logout";
const refreshRoute = userRoute + "/refresh-token";
const ForgotPassRoute = userRoute + "/forgot-password";
const ResetPassRoute = userRoute + "/reset-password";

// courses
const courseRoute = "/course"
const createCourseRoute = courseRoute + "/add-course"
const editCourseRoute = courseRoute + "/update"
const courseByIdRoute = courseRoute + "/getCourseById"
const deleteCourseRoute = courseRoute + "/delete"
const studentCoursesRoute = courseRoute
const courseCategoriesRoute = courseRoute + "/categories"
const courseLevelsRoute = courseRoute + "/levels"

// student course
const courseStudentRoute = "/student-course"
const checkCoursePurchaseInfoRoute = courseStudentRoute + "/check-purchase"
// public courses
const coursesRoute = courseRoute + "/all-filter"

// instructor
const instructorRoute = "/instructor"

// upload files
const uploadRoute = "/upload"
const deleteFileAfteruploadingRoute = uploadRoute+"/file"
const cancelUploadRoute = uploadRoute+"/cancel"
// order
const orderRoute = "order"
const createOrder = orderRoute + "/create-order"
// progress
const progressRoute = "course-progress";
const markLectureRoute = progressRoute + "/mark-lecture"
const currentCourseProgressRoute = progressRoute + "/get-current-course-progress"
const resetCourseProgressRoute = progressRoute + "/reset-course-progress"
export {
  markLectureRoute
  ,currentCourseProgressRoute,resetCourseProgressRoute
}


export {
  registerRoute,courseRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  ForgotPassRoute,
  ResetPassRoute,
};

export {coursesRoute, studentCoursesRoute,courseByIdRoute,editCourseRoute,deleteCourseRoute ,courseLevelsRoute, courseCategoriesRoute,createCourseRoute}

export { checkCoursePurchaseInfoRoute }

export { createOrder }

export {instructorRoute}

export {cancelUploadRoute, deleteFileAfteruploadingRoute}

