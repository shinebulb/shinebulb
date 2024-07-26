import React, { useState } from 'react';
import text from './assets/json/text.json';
import themes from './assets/themes';

function ThemeConstructor({ reference, themeState }) {
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;

    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");

    function customTheme() {
        document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 100);
        themeState(3);
        reference.current.close();
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", localBg);
        localStorage.setItem("font", localFont);
        themes[3]();
    }

    return (
        <dialog className="theme" ref={reference}>
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
            <hr />
            <div className="sample" style={{ backgroundColor: localBg, color: localFont }}>
                <p>{text[lang].sample}</p>
                <button onClick={customTheme} style={{ color: localFont, border: `${localFont} 3px solid` }}>
                    {text[lang].themeControls[0]}
                </button>
                <button onClick={() => reference.current.close()} style={{ color: localFont, border: `${localFont} 3px solid` }}>
                    {text[lang].themeControls[1]}
                </button>
            </div>
        </dialog>
    );
}

export default ThemeConstructor;
