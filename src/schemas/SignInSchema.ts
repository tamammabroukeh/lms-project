import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
const SignInSchema = (t: TypedTFunction) => {
  return z.object({
    userEmail: z
      .string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .email({ message: t("errors:login.email.type_is_email") }),
    password: z
      .string()
      .nonempty({
        message: t("errors:login.password.required_password"),
      })
      .min(8, { message: t("errors:login.password.min_password") }),
  });
};

type SignInType = z.infer<ReturnType<typeof SignInSchema>>;

export { SignInSchema, type SignInType };
