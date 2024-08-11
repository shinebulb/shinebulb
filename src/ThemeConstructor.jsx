import React, { useState } from 'react';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import includesDeep from './assets/includesDeep';
import themes from './assets/themes';

function ThemeConstructor({ constructor, alert, themeState }) {
    
    const lang = parseInt(localStorage.getItem("langMode") === null ? (languages.includes(window.navigator.language.slice(0, 2)) ? languages.indexOf(window.navigator.language.slice(0, 2)) : 0) : parseInt(localStorage.getItem("langMode")));

    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");

    const [saveIndex, setSaveIndex] = useState(parseInt(localStorage.getItem("saveIndex")) || -1);
    const [currentThemes, setCurrentThemes] = useState(JSON.parse(localStorage.getItem("themes")) || []);
    const [themeNames, setThemeNames] = useState(JSON.parse(localStorage.getItem("themeNames")) || []);

    function generateTheme() {
        setLocalBg(`#${Math.random().toString(16).substring(2, 8)}`);
        setLocalFont(`#${Math.random().toString(16).substring(2, 8)}`);
    }

    function customTheme() {
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 500);
        themeState(3);
        constructor.current.close();
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", localBg);
        localStorage.setItem("font", localFont);
        themes[3]();
    }

    function saveTheme(colors) {
        if (includesDeep(currentThemes, colors)) {
            setSaveIndex(0);
            localStorage.setItem("saveIndex", 0);
        }
        else {
            if ((JSON.parse(localStorage.getItem("themes")) !== null) && (JSON.parse(localStorage.getItem("themeNames")) !== null)) {
                setCurrentThemes([...JSON.parse(localStorage.getItem("themes")), colors]);
                localStorage.setItem("themes", JSON.stringify([...JSON.parse(localStorage.getItem("themes")), colors]));
                setThemeNames([...JSON.parse(localStorage.getItem("themeNames")), `${text[lang].themeCard[0]} #${currentThemes.length + 1}`]);
                localStorage.setItem("themeNames", JSON.stringify([...JSON.parse(localStorage.getItem("themeNames")), `${text[lang].themeCard[0]} #${currentThemes.length + 1}`]));
            }
            else {
                setCurrentThemes([colors]);
                localStorage.setItem("themes", JSON.stringify([colors]));
                setThemeNames([`${text[lang].themeCard[0]} #1`]);
                localStorage.setItem("themeNames", JSON.stringify([`${text[lang].themeCard[0]} #1`]));
            }
            setSaveIndex(1);
            localStorage.setItem("saveIndex", 1);
        }
        alert.current.show();
        setTimeout(() => alert.current.close(), 1500);
    }

    return (
        <dialog className="theme" ref={constructor}>
            <div className="themeHeader">
                <div>
                    <label>
                        {text[lang].customTheme[0]}<br />
                        <span>{`(${text[lang].current}: ${localBg})`}</span>
                    </label>
                    <input type="color" value={localBg} onChange={event => setLocalBg(event.target.value)} />
                </div>
                <div>
                    <label>
                        {text[lang].customTheme[1]}<br />
                        <span>{`(${text[lang].current}: ${localFont})`}</span>
                    </label>
                    <input type="color" value={localFont} onChange={event => setLocalFont(event.target.value)} />
                </div>
            </div>
            <hr/>
            <button className="modal-options" onClick={generateTheme}>
                <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d={paths.generate}/></svg>
                {text[lang].generateRandom}
            </button>
            <hr/>
            <div className="sample" style={{ backgroundColor: localBg, color: localFont }}>
                <p>{text[lang].sample}</p>
                <button
                    onClick={customTheme}
                    style={{backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang].themeControls[0]}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.apply} stroke={localFont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                    onClick={() => constructor.current.close()}
                    style={{backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang].themeControls[1]}
                >
                    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={localFont} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                </button>
                <button
                    onClick={() => saveTheme([localBg, localFont])}
                    style={{backgroundColor: "transparent", border: `${localFont} 3px solid`}}
                    title={text[lang].themeControls[2]}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} stroke={localFont} strokeWidth="2" strokeLinejoin="round"/></svg>
                </button>
            </div>
            <dialog className="alert" ref={alert}  style={{backgroundColor: saveIndex ? "#b7ffb0" : "#ffb0c5", color: saveIndex ? "#003e0a" : "#4b0134"}}>
                <div>
                    <p>{text[lang].savedStatus[saveIndex]}</p>
                    <button onClick={() => alert.current.close()}>
                        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={saveIndex ? "#003e0a" : "#4b0134"} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                    </button>
                </div>
            </dialog>
        </dialog>
    );
}

export default ThemeConstructor;
