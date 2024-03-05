import React from "react";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend, {type HttpBackendOptions} from "i18next-http-backend";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { AppLoader } from "./app-layout/app-loader";
export function I18nProvider(props: React.PropsWithChildren) {
    i18n
        .use(LanguageDetector)
        .use(HttpBackend)
        .use(initReactI18next)
        .init<HttpBackendOptions>({
            fallbackLng: 'en-GB',
            load: 'currentOnly',
            lng: 'en-GB',
            react: {
                useSuspense: true
            },
            backend: {
                loadPath: '{{lng}}'
            //     request: (options, url, payload, callback) => {}
            }
            })
    return (
    <React.Suspense fallback={<AppLoader />}>
        <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
    </React.Suspense>
    )
}
