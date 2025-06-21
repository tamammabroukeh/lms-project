// auth
const userRoute = "/user";
const authRoute = "/auth";
const registerRoute = userRoute + authRoute + "/register";
const loginRoute = userRoute + authRoute + "/login";
const logoutRoute = userRoute + "/logout";
const refreshRoute = userRoute + "/refresh-token";
const ForgotPassRoute = userRoute + "/forgot-password";
const ResetPassRoute = userRoute + "/reset-password";
export {
  registerRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  ForgotPassRoute,
  ResetPassRoute,
};
