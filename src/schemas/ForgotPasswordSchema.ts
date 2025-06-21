import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
const ForgotPassSchema = (t: TypedTFunction) => {
  return z.object({
    userEmail: z
      .string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .email({ message: t("errors:login.email.type_is_email") }),
  });
};

type ForgotPassType = z.infer<ReturnType<typeof ForgotPassSchema>>;

export { ForgotPassSchema, type ForgotPassType };
