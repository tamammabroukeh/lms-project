import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
const CreateCourseContentSchema = (t: TypedTFunction) => {
  return z.object({
    lectureTitleAR: z.string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .max(100, {
        message: "Lecture title shouldn`t be more than 100 characters"
      }).min(5, { message: "Lecture title should be at least 5 characters" }),
    lectureTitleEN: z.string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .max(100, {
        message: "Lecture title shouldn`t be more than 100 characters"
      }).min(5, { message: "Lecture title should at least 5 characters" })
    , videoUrl: z.string()
      .nonempty({ message: t("errors:login.email.required_email") })
      .url({ message: t("errors:login.email.type_is_email") }),
    public_id: z.string().optional(),
    resource_type: z.string().optional(),
    freePreview: z.boolean().optional(),
  });
};

type CreateCourseContentType = z.infer<ReturnType<typeof CreateCourseContentSchema>>;

export { CreateCourseContentSchema, type CreateCourseContentType };