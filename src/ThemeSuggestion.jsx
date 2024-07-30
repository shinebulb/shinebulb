import React, {useState} from 'react';
import themes from './assets/themes'
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import colors from './assets/json/explore-colors.json';

function ThemeSuggestion({themeIndex}) {
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;

    const [hide, setHide] = useState("block");

    function paintTheme() {
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", colors[themeIndex][0]);
        localStorage.setItem("font", colors[themeIndex][1]);
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        themes[3]();
    }

    return (
        <div className="theme-card" style={{display: hide, backgroundColor: colors[themeIndex][0]}}>
            <p style={{color: colors[themeIndex][1]}}>{text[lang].names[themeIndex]}</p>
            <div className="saved-controls">
                <button style={{backgroundColor: colors[themeIndex][0], border: `${colors[themeIndex][1]} 3px solid`}}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} stroke={colors[themeIndex][1]} strokeWidth="2" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={paintTheme} style={{backgroundColor: colors[themeIndex][0], border: `${colors[themeIndex][1]} 3px solid`}}>
                    <svg fill={colors[themeIndex][1]} version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" d={paths.paint}/></svg>
                </button>
                <button onClick={() => setHide("none")} style={{backgroundColor: colors[themeIndex][0], border: `${colors[themeIndex][1]} 3px solid`}}>
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]} fill={colors[themeIndex][1]}/><path d={paths.hide[1]} fill={colors[themeIndex][1]}/></svg>
                </button>
            </div>
        </div>
    )
}

export default ThemeSuggestion