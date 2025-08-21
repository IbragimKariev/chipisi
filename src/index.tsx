import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "antd/es/style/themes/default.less";
// import "antd/dist/antd.less";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import ruRU from "antd/es/locale/ru_RU";
import { ConfigProvider } from "antd";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { rootStore } from "./redux/root/root.store";
import moment from "moment";
import 'moment/locale/ru';
import 'moment/locale/ky';
import { DarkModeProvider } from "./contexts/DarkModeContext";

moment.locale('ru');

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['ky', 'ru'],
    fallbackLng: "ru",
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },


  });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.Suspense >
    <ConfigProvider locale={ruRU}>
      <Provider store={rootStore}>
        <BrowserRouter>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.Suspense>
);
