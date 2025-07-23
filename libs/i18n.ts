import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

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

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
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
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
    });

export default i18n;
