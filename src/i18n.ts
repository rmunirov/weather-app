// @ts-nocheck
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';

i18next
    .use(XHR)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'ru',
        load: 'currentOnly',
        keySeparator: false,
        whitelist: ['ru', 'en'],
    });

export default i18next;
