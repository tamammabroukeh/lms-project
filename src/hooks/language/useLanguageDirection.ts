import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export const useLanguageDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";

    // Set HTML direction and lang attributes
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", i18n.language);

    // Add CSS class to body for easy styling
    document.body.classList.toggle("rtl", dir === "rtl");
    document.body.classList.toggle("ltr", dir === "ltr");
  }, [i18n.language]);
};
