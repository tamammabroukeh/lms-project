import { z } from "zod";
import { TypedTFunction } from "@/hooks/language/useTypedTranslation";
import { CreateCourseContentSchema } from ".";
const CreateCourseSchema = (t: TypedTFunction) => {
  return z.object({
    titleCourseEN:z.string().nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Title should be at least 5 characters"}).
    max(100, {
        message:"Course Title shouldn`t be more than 100 characters"
    }),
    titleCourseAR:z.string().nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Title should be at least 5 characters"}).
    max(100, {
        message:"Course Title shouldn`t be more than 100 characters"
    }),

    subTitleCourseEN:z.string().
    nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Subtitle should be at least 5 characters"}).
    max(100, {
        message:"Course Subtitle shouldn`t be more than 100 characters"
    }),
    subTitleCourseAR:z.string().
    nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Subtitle should be at least 5 characters"}).
    max(100, {
        message:"Course Subtitle shouldn`t be more than 100 characters"
    })
    ,
    descriptionEN:z.string().
    nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Subtitle should be at least 5 characters"}).
    max(255, {
        message:"Course Subtitle shouldn`t be more than 100 characters"
    }),
    descriptionAR:z.string().
    nonempty({ message: t("errors:login.email.required_email") }).
    min(5, {message:"Course Subtitle should be at least 5 characters"}).
    max(255, {
        message:"Course Subtitle shouldn`t be more than 100 characters"
    }),
    price:z.number().nonnegative({ message: t("errors:login.email.required_email") }).
    min(0, {message:"Course Price should be at least 5 characters"}),

    category: z.string().min(1, "English category is required"),
    level: z.string().min(1, "Arabic level is required"),
    primaryLanguage: z.string().min(1, "Arabic primary language is required"),

    objectivesAR: z.string().optional(),
    objectivesEN: z.string().optional(),   
    welcomeMessageAR: z.string().optional(),
    welcomeMessageEN: z.string().optional(),

    coverImage: z.object({
        url:z.string().url(),
        resourceType:z.string(),
        public_id:z.string(),
    }),

    lectures: z.array(CreateCourseContentSchema(t))
    .min(1, {message:"At least one lecture is required"})   });
};

type CreateCourseType = z.infer<ReturnType<typeof CreateCourseSchema>>;

export { CreateCourseSchema, type CreateCourseType };
