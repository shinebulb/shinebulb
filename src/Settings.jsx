import React, {useState, useEffect} from 'react';
import enableDarkMode from './enableDarkMode';
import themes from './assets/json/themes.json';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';

function Settings() {

    useEffect(() => {document.title = text[lang].links[1]});
    useEffect(() => darkMode == "enabled" ? enableDarkMode() : undefined);
    useEffect(() => setLang(parseInt(localStorage.getItem("langMode")) || 0));
    useEffect(() => setTheme(parseInt(localStorage.getItem("theme")) || 0));

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);
    let darkMode = localStorage.getItem("darkMode");

    function disableDarkMode() {
        document.body.classList.remove("darkMode");
        localStorage.setItem("darkMode", null);
    }

    function themeChange(event) {
        const mode = themes.indexOf(event.target.value);
        mode ? enableDarkMode() : disableDarkMode();
        setTheme(mode);
        localStorage.setItem("theme", mode);
    }

    function languageChange(event) {
        setLang(languages.indexOf(event.target.value));
        localStorage.setItem("langMode", languages.indexOf(event.target.value));
    }

    return (
        <div className="settings">
            <h2>{text[lang].headings[1]}</h2>
            <div className="container">
                <label className="settingName">{text[lang].settings[0]}</label>
                <select onChange={themeChange} value={themes[theme]}>
                    <option value="light">{text[lang].mode[0]}</option>
                    <option value="dark">{text[lang].mode[1]}</option>
                </select>
            </div>
            <div style={{height: "3rem"}}/>
            <div className="container">
                <label>{text[lang].settings[1]}</label>
                <select onChange={languageChange} value={languages[lang]}>
                    <option value="english">english</option>
                    <option value="русский">русский</option>
                </select>
            </div>
            <div style={{height: "5rem"}}/>
            <a href="/home">{text[lang].back}</a>
        </div>
    )
}

export default Settings