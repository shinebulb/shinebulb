import React, {useState, useEffect, useRef} from 'react';
import ThemeConstructor from './ThemeConstructor';
import themes from './assets/themes';
import modes from './assets/json/modes.json';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';

function Settings() {

    useEffect(() => {
        document.title = text[lang].links[1];
        themes[theme]();
    });

    const [lang, setLang] = useState(parseInt(localStorage.getItem("langMode")) || 0);
    const [theme, setTheme] = useState(parseInt(localStorage.getItem("theme")) || 0);

    const modal = useRef(null);
    
    function themeChange(event) {
        const mode = modes.indexOf(event.target.value);
        if (mode !== 3) {
            themes[mode]();
            setTheme(mode);
            localStorage.setItem("theme", mode);
        }
        else {
            modal.current.showModal();
        }
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
                <select onChange={themeChange} value={modes[theme]}>
                    <option value="system">{text[lang].mode[0]}</option>
                    <option value="light">{text[lang].mode[1]}</option>
                    <option value="dark">{text[lang].mode[2]}</option>
                    <option value="custom">{text[lang].mode[3]}</option>
                </select>
            </div>
            <div style={{height: "3rem"}}/>
            <ThemeConstructor reference={modal} themeState={setTheme}/>
            <div className="container">
                <label>{text[lang].settings[1]}</label>
                <select onChange={languageChange} value={languages[lang]}>
                    <option value="english">english</option>
                    <option value="русский">русский</option>
                </select>
            </div>
            <div style={{height: "5rem"}}/>
            <a href="/">{text[lang].back}</a>
        </div>
    )
}

export default Settings
