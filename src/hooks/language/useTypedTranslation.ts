import { useTranslation as useI18nTranslation } from "react-i18next";

// Import JSON files as values
import authEn from "@/i18n/en/auth.json";
import errorsEn from "@/i18n/en/errors.json";
import homeEn from "@/i18n/en/home.json";
import courseEn from "@/i18n/en/course.json";

// Helper type to generate dot-separated paths for nested objects
type PathsToStringProps<T> = T extends string
  ? ""
  : {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? `${K & string}.${PathsToStringProps<T[K]>}`
        : K;
    }[keyof T];

// Remove trailing dots from key paths
type RemoveTrailingDot<T> = T extends `${infer U}.` ? U : T;
type NestedKeyOf<T> = RemoveTrailingDot<PathsToStringProps<T>>;

// Extract keys from imported JSONs
type AuthKeys = NestedKeyOf<typeof authEn>;
type HomeKeys = NestedKeyOf<typeof homeEn>;
type ErrorKeys = NestedKeyOf<typeof errorsEn>;
type CourseKeys = NestedKeyOf<typeof courseEn>;

// Create union type for all possible keys
type TranslationKeys =
  | `auth:${AuthKeys}`
  | `home:${HomeKeys}`
  | `errors:${ErrorKeys}`
  | `course:${CourseKeys}`;

export interface TypedTFunction {
  (key: TranslationKeys, options?: Record<string, unknown>): string;
}

export function useTypedTranslation() {
  const { t, ...rest } = useI18nTranslation();
  return {
    t: t as TypedTFunction,
    ...rest,
  };
}
