import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
const ResetPassSchema = (t: TypedTFunction) => {
  return z.object({
    newPassword: z
      .string()
      .nonempty({
        message: t("errors:login.password.required_password"),
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./]).{8,}$/,
        {
          message: t("errors:login.password.regex_password"),
        }
      ),
    userEmail: z
      .string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .email({ message: t("errors:login.email.type_is_email") }),
    resetCode: z
      .string()
      .nonempty({ message: t("errors:login.resetCode.required_resetCode") })
      .min(4, { message: t("errors:login.resetCode.min_resetCode") })
      .max(4, { message: t("errors:login.resetCode.required_resetCode") }),
  });
};

type ResetPassType = z.infer<ReturnType<typeof ResetPassSchema>>;

export { ResetPassSchema, type ResetPassType };
