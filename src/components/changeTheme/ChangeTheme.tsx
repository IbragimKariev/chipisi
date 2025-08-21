import React from 'react'
import { getCookie, setCookie } from 'typescript-cookie';
import { Switch } from 'antd';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import sun from "./sun.svg"
import moon from "./moon.svg"

export const ChangeTheme = () => {
    // const [isDarkMode, setIsDarkMode] = useState(getCookie('theme') === 'light' ? false : true);
    // const { t } = useTranslation();

    // const setThemeFromCookie = () => {
    //     const themeFromCookie = getCookie("theme");
    //     if (themeFromCookie === "dark") {
    //         switcher({ theme: themes.dark });
    //     } else {
    //         switcher({ theme: themes.light });
    //     }
    // };
    // useEffect(() => {
    //     // Вызов функции для установки текущей темы из куки при инициализации
    //     setThemeFromCookie();
    // }, []);


    // const toggleDarkMode = () => {
    //     setIsDarkMode(previous => {
    //         const newTheme = previous ? themes.light : themes.dark;
    //         switcher({ theme: newTheme });
    //         // Устанавливаем тему в куки при смене
    //         setCookie("theme", newTheme);
    //         return !previous;
    //     });
    // };
    return (
            <></>
            // <Switch
            //     onChange={toggleDarkMode}
            //     checkedChildren={<img className='theme_icon' src={sun}/>}
            //     unCheckedChildren={<img className='theme_icon' src={moon}/>}
            //     checked={currentTheme === "light" ? true : false}
            // />
    )
}
