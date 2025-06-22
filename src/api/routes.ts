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
const studentCoursesRoute = courseRoute + "/student"

// instructor
const instructorRoute = "/instructor"

const cancelUploadRoute = "/cancel-upload"

export {
  registerRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  ForgotPassRoute,
  ResetPassRoute,
};

export {studentCoursesRoute}

export {instructorRoute}

export {cancelUploadRoute}