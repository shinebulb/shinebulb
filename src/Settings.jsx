import React, {useState, useEffect, useRef} from 'react';
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
    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");
    
    const custom = useRef(null);
    const saved = useRef(null);

    function themeChange(event) {
        const mode = modes.indexOf(event.target.value);
        if (mode < 3) {
            themes[mode]();
            setTheme(mode);
            localStorage.setItem("theme", mode);
        }
        else if (mode === 3) {
            custom.current.showModal();
        }
        else if (mode === 4) {
            saved.current.showModal();
        }
    }

    function languageChange(event) {
        setLang(languages.indexOf(event.target.value));
        localStorage.setItem("langMode", languages.indexOf(event.target.value));
    }

    function customTheme() {
        setTheme(3);
        custom.current.close();
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", localBg);
        localStorage.setItem("font", localFont);
        themes[theme]();
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
                    <option value="saved">{text[lang].mode[4]}</option>
                </select>
            </div>
            <dialog className="theme" ref={custom}><div className="themeHeader"><div>
                <label>{text[lang].customTheme[0]}<br/><span>{`(${text[lang].current}: ${localBg})`}</span></label>
                <input type="color" value={localBg} onChange={event => {setLocalBg(event.target.value);}}/></div>
                <div><label>{text[lang].customTheme[1]}<br/><span>{`(${text[lang].current}: ${localFont})`}</span></label>
                <input type="color" value={localFont} onChange={event => {setLocalFont(event.target.value);}}/></div></div>
                <hr/><div className="sample" style={{backgroundColor: localBg, color: localFont}}>
                <p>{text[lang].sample}</p>
                <button onClick={customTheme} style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[0]}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={localFont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => custom.current.close()} style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[1]}><svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={localFont} transform="translate(91.520000, 91.520000)"><polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48" /></g></g></svg></button>
                <button style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[2]}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke={localFont} strokeWidth="2" strokeLinejoin="round"/></svg></button></div>
            </dialog>
            <dialog className="saved" ref={saved}>
                <h3>{text[lang].unavailable}</h3>
                <button onClick={() => saved.current.close()}>{text[lang].back}</button>
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
            <a href="/">{text[lang].back}</a>
        </div>
    )
}

export default Settings