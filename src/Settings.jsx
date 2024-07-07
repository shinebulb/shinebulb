import React, {useState, useEffect} from 'react';
import enableDarkMode from './enableDarkMode';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';

function Settings() {

    useEffect(() => {document.title = text[lang].links[1]});
    useEffect(() => darkMode == "enabled" ? advanceDarkMode() : undefined);
    useEffect(() => setLang(parseInt(localStorage.getItem("langMode")) || 0));

    const [mode, setMode] = useState(0);
    const [lang, setLang] = useState(0);
    let darkMode = localStorage.getItem("darkMode");

    function advanceDarkMode() {
        enableDarkMode();
        setMode(1);
    }

    function disableDarkMode() {
        document.body.classList.remove("darkMode");
        localStorage.setItem("darkMode", null);
        setMode(0);
    }

    function modeToggle() {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode != "enabled") {
            advanceDarkMode();
        }
        else {
            disableDarkMode();
        }
    }

    function languageChange(event) {
        setLang(languages.indexOf(event.target.value));
        localStorage.setItem("langMode", languages.indexOf(event.target.value))
    }

    return (
        <div className="settings">
            <h2>{text[lang].headings[1]}</h2>
            <div className="container">
                <label className="settingName">{text[lang].settings[0]}</label>
                <select onChange={modeToggle}>
                    <option value="system">{text[lang].mode[0]}</option>
                    <option value="light">{text[lang].mode[1]}</option>
                    <option value="dark">{text[lang].mode[2]}</option>
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