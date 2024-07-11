import React, {useState, useEffect, useRef} from 'react';
import themes from './assets/themes';
import modes from './assets/json/modes.json';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';

function Settings() {

    useEffect(() => {
        document.title = text[lang].links[1];
        themes[theme]();
        setLang(parseInt(localStorage.getItem("langMode")) || 0);
        setTheme(parseInt(localStorage.getItem("theme")) || 0);
    });

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);
    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");

    const modal = useRef(null);

    function themeChange(event) {
        const mode = modes.indexOf(event.target.value);
        mode === 3 ? modal.current.showModal() : themes[mode]();
        setTheme(mode === 3 ? theme : mode);
        localStorage.setItem("theme", mode === 3 ? theme : mode);
    }

    function languageChange(event) {
        setLang(languages.indexOf(event.target.value));
        localStorage.setItem("langMode", languages.indexOf(event.target.value));
    }

    function customTheme() {
        setTheme(3);
        modal.current.close();
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", localBg);
        localStorage.setItem("font", localFont);
        themes[theme]();
    }

    function cancelCustom() {
        setTheme(0);
        modal.current.close();
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
            <dialog className="theme" ref={modal}>
                <div className="themeHeader">
                    <div>
                        <label>
                            {text[lang].customTheme[0]}<br/>
                            <span>{`(${text[lang].current}: ${localBg})`}</span>
                        </label>
                        <input type="color" value={localBg} onChange={event => {
                            setLocalBg(event.target.value);
                        }}/>
                    </div>
                    <div>
                        <label>
                            {text[lang].customTheme[1]}<br/>
                            <span>{`(${text[lang].current}: ${localFont})`}</span>
                        </label>
                        <input type="color" value={localFont} onChange={event => {
                            setLocalFont(event.target.value);
                        }}/>
                    </div>
                </div>
                <hr />
                <div className="sample" style={{backgroundColor: localBg, color: localFont}}>
                    <p>{text[lang].sample}</p>
                    <button onClick={customTheme} style={{backgroundColor: localBg, color: localFont, border: `${localFont} 3px solid`}}>
                        {text[lang].themeControls[0]}
                    </button>
                    <button onClick={cancelCustom} style={{backgroundColor: localBg, color: localFont, border: `${localFont} 3px solid`}}>
                        {text[lang].themeControls[1]}
                    </button>
                </div>
            </dialog>
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