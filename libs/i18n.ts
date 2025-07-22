import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import enCommon from "@/locales/en/translation.json";
import viCommon from "@/locales/vi/translation.json";

const resources = {
    en: {
        common: enCommon,
    },
    vi: {
        common: viCommon,
    },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "vi",
    debug: false,
    defaultNS: "common",
    ns: ["common"],

    interpolation: {
        escapeValue: false,
    },

    react: {
        useSuspense: false,
    },
});

export default i18n;
