/**
 * @deprecated NEVER USED, use local JSON instead
 * @name i18n.js
 * @description Inicialización del multidioma
 * Backend: Carga la traducción usando XHR, los ficheros deben localizarse en: /public/locales/{lang}/translation.json
 * LanguageDetector: Detecta el idioma del usuario
 * initReactI18next: Instancia de i18n a react-i18next
 * @author Sergio
 * @version 1.0.0
 * @url https://react.i18next.com/guides/quick-start
*/

//  import i18n from 'i18next';
//  import Backend from 'i18next-xhr-backend';
//  import LanguageDetector from 'i18next-browser-languagedetector';
//  import { initReactI18next } from 'react-i18next';

//  const fallbackLng = ['en'];
//  const availableLanguages = ['en', 'es', 'pt'];

//  i18n
//      .use(Backend)
//      .use(LanguageDetector)
//      .use(initReactI18next)
//      .init({
//          fallbackLng,
//          debug: true,
//          whitelist: availableLanguages,        
//          interpolation: {
//              escapeValue: false
//          },
//          react: {
//              useSuspense: false
//          }, 
//          backend: {
//              loadPath: '/public/locales/{{lng}}/{{ns}}.json'
//          }
//      });

//  export default i18n;
