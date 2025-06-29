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
const studentCoursesRoute = courseRoute + "/student"
const courseCategoriesRoute = courseRoute + "/categories"
const courseLevelsRoute = courseRoute + "/levels"

// instructor
const instructorRoute = "/instructor"

// upload files
const uploadRoute = "/upload"
const deleteFileAfteruploadingRoute = uploadRoute+"/file"
const cancelUploadRoute = uploadRoute+"/cancel"

export {
  registerRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  ForgotPassRoute,
  ResetPassRoute,
};

export {studentCoursesRoute ,courseLevelsRoute, courseCategoriesRoute,createCourseRoute}

export {instructorRoute}

export {cancelUploadRoute, deleteFileAfteruploadingRoute}