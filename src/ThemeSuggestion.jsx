import React, {useState, useRef} from 'react';
import themes from './assets/themes'
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import colors from './assets/json/explore-colors.json';

function ThemeSuggestion({themeIndex}) {
    
    const lang = parseInt(localStorage.getItem("langMode") === null ? (languages.includes(window.navigator.language.slice(0, 2)) ? languages.indexOf(window.navigator.language.slice(0, 2)) : 0) : parseInt(localStorage.getItem("langMode")));

    const [hide, setHide] = useState(localStorage.getItem(`display #${themeIndex + 1}`) || "block");

    const hideRef = useRef(null);
    const infoRef = useRef(null);

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

    function hideTheme() {
        setHide("none");
        localStorage.setItem(`display #${themeIndex + 1}`, "none");
    }

    return (
        <div className="theme-card" style={{display: hide, backgroundColor: colors[themeIndex][0]}}>
            <p style={{color: colors[themeIndex][1]}}>{text[lang].names[themeIndex]}</p>
            <div className="saved-controls">
                <button
                    title={text[lang].exploreCard[0]}
                    style={{
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    onClick={() => infoRef.current.showModal()}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.info[0]} fill={colors[themeIndex][1]}/><path d={paths.info[1]} stroke={colors[themeIndex][1]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d={paths.info[2]} stroke={colors[themeIndex][1]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                    title={text[lang].exploreCard[1]}
                    style={{
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    onClick={paintTheme}
                >
                    <svg fill={colors[themeIndex][1]} version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" d={paths.paint}/></svg>
                </button>
                <button
                    title={text[lang].exploreCard[2]}
                    style={{
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    onClick={() => hideRef.current.showModal()}
                >
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d={paths.hide[0]} fill={colors[themeIndex][1]}/><path d={paths.hide[1]} fill={colors[themeIndex][1]}/></svg>
                </button>

                <dialog ref={hideRef} className="confirm">
                    <p>{text[lang].hideTheme}</p>
                    <button onClick={hideTheme}>{text[lang].confirm[1]}</button>
                    <button onClick={() => hideRef.current.close()}>{text[lang].confirm[2]}</button>
                </dialog>
                <dialog
                    style={{
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    ref={infoRef}
                    className="theme-info"
                >
                    <p id="info-title" style={{color: colors[themeIndex][1]}}>
                        {text[lang].exploreCard[0]}:<br/>
                        {text[lang].names[themeIndex]}
                    </p>
                    <hr style={{
                        backgroundColor: colors[themeIndex][0],
                        borderTop: `${colors[themeIndex][1]} 5px dotted`,
                        marginTop: "0.8rem"
                    }} />
                    <div className="span-container" style={{margin: "0.6rem"}}>
                        <span style={{color: colors[themeIndex][1]}}>{text[lang].exploreDescriptions[themeIndex]}</span>
                    </div>
                    <button
                        id="info-button"
                        style={{
                            color: colors[themeIndex][1],
                            border: `${colors[themeIndex][1]} 3px solid`
                        }}
                        onClick={() => infoRef.current.close()}>{text[lang].back}</button>
                </dialog>
            </div>
        </div>
    )
}

export default ThemeSuggestion