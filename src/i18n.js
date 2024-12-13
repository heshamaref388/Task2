import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "de", // Default language
    fallbackLng: "en", // Fallback language if a translation is missing
    backend: {
      loadPath: "/locales/{{lng}}.json", // Corrected path to translation files
    },
    interpolation: {
      escapeValue: false, // React escapes values by default
    },
  });

export default i18n;
