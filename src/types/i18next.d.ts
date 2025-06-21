import "i18next";
import auth from "@/i18n/en/auth.json";
import errors from "@/i18n/en/errors.json";
import home from "@/i18n/en/home.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "auth";
    resources: {
      auth: typeof auth;
      home: typeof home;
      errors: typeof errors;
    };
  }
}
