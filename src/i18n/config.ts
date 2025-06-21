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

const resources = {
  en: {
    auth: enAuth,
    home: enHome,
    errors: enErrors,
  },
  ar: {
    auth: arAuth,
    home: arHome,
    errors: arErrors,
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
