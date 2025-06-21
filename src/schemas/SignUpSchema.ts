import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
const SignUpSchema = (t: TypedTFunction) => {
  return z.object({
    userName: z
      .string()
      .nonempty({ message: t("errors:login.userName.required_userName") })
      .min(2, { message: t("errors:login.userName.min_userName") }),
    userEmail: z
      .string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .email({ message: t("errors:login.email.type_is_email") }),
    password: z
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
  });
};
type SignUpType = z.infer<ReturnType<typeof SignUpSchema>>;

export { SignUpSchema, type SignUpType };
