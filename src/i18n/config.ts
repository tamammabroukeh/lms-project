import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// auth
import enAuth from "./en/auth.json";
import arAuth from "./ar/auth.json";
// home
import enHome from "./en/home.json";
import arHome from "./ar/home.json";
// errors
import enErrors from "./en/errors.json";
import arErrors from "./ar/errors.json";
//admin-dashboard
import enAdmin from "./en/admin.json";
import arAdmin from "./ar/admin.json";

// course
import enCourse from "./en/course.json";
import arCourse from "./ar/course.json";

import enCommon from "./en/common.json";
import arCommon from "./ar/common.json";

const resources = {
  en: {
    auth: enAuth,
    home: enHome,
    errors: enErrors,
    course:enCourse,
    admin:enAdmin,
    common:enCommon,
  },
  ar: {
    auth: arAuth,
    home: arHome,
    errors: arErrors,
    course: arCourse,
    admin:arAdmin,
    common:arCommon,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
      cookieOptions: {
        sameSite: "strict",
        maxAge: 365,
      },
    },
  });

export default i18n;