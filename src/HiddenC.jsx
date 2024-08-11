import React, {useState, useRef} from 'react';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import colors from './assets/json/explore-colors.json';

function HiddenCard({themeIndex}) {

    const lang = parseInt(localStorage.getItem("langMode") === null ? (languages.includes(window.navigator.language.slice(0, 2)) ? languages.indexOf(window.navigator.language.slice(0, 2)) : 0) : parseInt(localStorage.getItem("langMode")));

    const [hide, setHide] = useState(localStorage.getItem(`display #${themeIndex + 1}`) == "none" ? "block" : "none");

    const infoRef = useRef(null);

    function hideTheme() {
        setHide("none");
        localStorage.setItem(`display #${themeIndex + 1}`, "block");
    }
    
    return (
        <div className="theme-card" style={{display: hide, backgroundColor: colors[themeIndex][0]}}>
            <p style={{color: colors[themeIndex][1]}}>{text[lang].names[themeIndex]}</p>
            <div className="saved-controls">
                <button
                    title={text[lang].exploreCard[0]}
                    style={{
                        width: "45%",
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    onClick={() => infoRef.current.showModal()}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.info[0]} fill={colors[themeIndex][1]}/><path d={paths.info[1]} stroke={colors[themeIndex][1]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d={paths.info[2]} stroke={colors[themeIndex][1]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                    title={text[lang].restore}
                    style={{
                        width: "45%",
                        backgroundColor: colors[themeIndex][0],
                        border: `${colors[themeIndex][1]} 3px solid`
                    }}
                    onClick={hideTheme}
                >
                    <svg fill={colors[themeIndex][1]} viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><rect className="clr-i-outline clr-i-outline-path-1" x="6" y="22" width="24" height="2"></rect><rect className="clr-i-outline clr-i-outline-path-2" x="26" y="26" width="4" height="2"></rect><path className="clr-i-outline clr-i-outline-path-3" d={paths.restore[0]}></path><path className="clr-i-outline clr-i-outline-path-4" d={paths.restore[1]}></path><rect x="0" y="0" width="36" height="36" fillOpacity="0"/></svg>
                </button>

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

export default HiddenCard