import React, { useState, useRef } from 'react';
import hsl from 'hex-to-hsl';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import includesDeep from './assets/includesDeep';
import themes from './assets/themes';

function ThemeConstructor({ constructor, buttonOptions, alert, themeState }) {
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    
    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");
    
    const [saveIndex, setSaveIndex] = useState(parseInt(localStorage.getItem("saveIndex")) || -1);
    const [currentThemes, setCurrentThemes] = useState(JSON.parse(localStorage.getItem("themes")) || []);
    const [themeNames, setThemeNames] = useState(JSON.parse(localStorage.getItem("themeNames")) || []);
    
    const [openAdv, setOpenAdv] = useState(0);
    const [hover, setHover] = useState([false, false, false]);
    
    const [buttonBg, setButtonBg] = useState(localStorage.getItem("buttonBg") || localBg);
    const [buttonFont, setButtonFont] = useState(localStorage.getItem("buttonFont") || localFont);

    const [h, s, l] = hsl(buttonBg);
    
    const [normalCoef, setNormalCoef] = useState(l);
    const [hoverCoef, setHoverCoef] = useState(localStorage.getItem("hoverCoef") || l);

    const optionBlock = useRef(null);

    function openAdvanced() {
        openAdv ? buttonOptions.current.close() : buttonOptions.current.show();
        setOpenAdv(openAdv ? 0 : 1);
        optionBlock.current.show();
    }

    function buttonStylingSelect(event) {
        const selectedStyling = event.target.value;
        if (selectedStyling == "default") {
            setNormalCoef(hsl(localBg)[2]);
            setHoverCoef(hsl(localBg)[2]);
            setButtonBg(localBg);
            setButtonFont(localFont);
            optionBlock.current.classList.remove("adjusted-option-block");
            optionBlock.current.classList.remove("custom-option-block");
            optionBlock.current.classList.add("default-option-block");
        }
        else if (selectedStyling == "adjusted") {
            setNormalCoef(hsl(localBg)[2]);
            setHoverCoef(hsl(localBg)[2]);
            setButtonBg(localBg);
            setButtonFont(localFont);
            optionBlock.current.classList.remove("default-option-block");
            optionBlock.current.classList.remove("custom-option-block");
            optionBlock.current.classList.add("adjusted-option-block");
        }
        else if (selectedStyling == "custom") {
            setNormalCoef(hsl(localBg)[2]);
            setHoverCoef(hsl(localBg)[2]);
            setButtonBg(localBg);
            setButtonFont(localFont);
            optionBlock.current.classList.remove("default-option-block");
            optionBlock.current.classList.remove("adjusted-option-block");
            optionBlock.current.classList.add("custom-option-block");
        }
        optionBlock.current.show();
    }

    function generateTheme() {
        const randomBg = `#${Math.random().toString(16).substring(2, 8)}`;
        const randomFont = `#${Math.random().toString(16).substring(2, 8)}`;
        setLocalBg(randomBg);
        setLocalFont(randomFont);
        setButtonBg("transparent");
        setButtonFont(randomFont);
        setNormalCoef(l);
        setHoverCoef(l);
    }

    function customTheme() {
        document.body.classList.add('theme-transition');
        setTimeout(() => document.body.classList.remove('theme-transition'), 500);
        themeState(3);
        constructor.current.close();
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", localBg);
        localStorage.setItem("font", localFont);
        localStorage.setItem("buttonBg", buttonBg);
        localStorage.setItem("buttonFont", buttonFont);
        if (optionBlock.current.classList.contains("adjusted-option-block")) {
            localStorage.setItem("hoverCoef", hoverCoef);
        }
        else {
            localStorage.setItem("hoverCoef", hsl(buttonBg)[2]);
        }
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
                        {text[lang].customTheme[0]}:<br />
                        <span>({text[lang].current}: {localBg})</span>
                    </label>
                    <input type="color" value={localBg} onChange={event => setLocalBg(event.target.value)} />
                </div>
                <div>
                    <label>
                        {text[lang].customTheme[1]}:<br />
                        <span>({text[lang].current}: {localFont})</span>
                    </label>
                    <input type="color" value={localFont} onChange={event => setLocalFont(event.target.value)} />
                </div>
            </div>
            <hr/>
            <button className="modal-options" onClick={openAdvanced}>
                {!openAdv ? <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" strokeWidth="1.5" style={{fill: "none"}}/><path style={{fill: "none"}} d={paths.settings} strokeWidth="1.5"/></svg>
                : <svg style={{height: "1.2rem", marginRight: "0.5rem"}} viewBox="0 0 52 52" dataname="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d={paths.back}/></svg>}
                {text[lang].advancedOptions[openAdv]}
            </button>
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
                    style={{
                        backgroundColor: hover[0] ? `hsl(${hsl(localBg)[0]}, ${hsl(localBg)[1]}%, ${hoverCoef}%)` : buttonBg,
                        border: `${buttonFont} 3px solid`
                    }}
                    title={text[lang].themeControls[0]}
                    onMouseEnter={() => {
                        if (optionBlock.current.classList.contains("adjusted-option-block")) setHover([true, false, false]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.apply} stroke={buttonFont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                    onClick={() => constructor.current.close()}
                    style={{
                        backgroundColor: hover[1] ? `hsl(${hsl(localBg)[0]}, ${hsl(localBg)[1]}%, ${hoverCoef}%)` : buttonBg,
                        border: `${buttonFont} 3px solid`
                    }}
                    title={text[lang].themeControls[1]}
                    onMouseEnter={() => {
                        if (optionBlock.current.classList.contains("adjusted-option-block")) setHover([false, true, false]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={buttonFont} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                </button>
                <button
                    onClick={() => saveTheme([localBg, localFont, buttonBg, buttonFont, hoverCoef])}
                    style={{
                        backgroundColor: hover[2] ? `hsl(${hsl(localBg)[0]}, ${hsl(localBg)[1]}%, ${hoverCoef}%)` : buttonBg,
                        border: `${buttonFont} 3px solid`
                    }}
                    title={text[lang].themeControls[2]}
                    onMouseEnter={() => {
                        if (optionBlock.current.classList.contains("adjusted-option-block")) setHover([false, false, true]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} stroke={buttonFont} strokeWidth="2" strokeLinejoin="round"/></svg>
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
            <dialog ref={buttonOptions} className="advanced-dialog">
                <div className="advanced-container">
                    <div className="advanced-positions">
                        <div className="button-options-select">
                            <label>{text[lang].buttonStyling}:</label>
                            <select onChange={buttonStylingSelect}>
                                <option value="default">{text[lang].buttonStylingOptions[0]}</option>
                                <option value="adjusted">{text[lang].buttonStylingOptions[1]}</option>
                                <option value="custom">{text[lang].buttonStylingOptions[2]}</option>
                            </select>
                        </div>
                        <div className="adjusting-coefficient">
                            <label>
                                {text[lang].adjustingCoefficient[0]}:
                                <input
                                    min={0}
                                    max={100}
                                    type="number"
                                    value={normalCoef}
                                    onChange={event => {
                                        const [h, s, l] = hsl(localBg);
                                        setNormalCoef(event.target.value);
                                        setButtonBg(`hsl(${h}, ${s}%, ${event.target.value}%)`);
                                    }}
                                />%
                            </label>
                            <span style={{fontSize: "1.3rem", margin: "0 0.5rem"}}>|</span>
                            <label>
                                {text[lang].adjustingCoefficient[1]}:
                                <input
                                    min={0}
                                    max={100}
                                    type="number"
                                    value={hoverCoef}
                                    onChange={event => setHoverCoef(event.target.value)}
                                />%
                            </label>
                        </div>
                        <div className="custom-button">
                            <div>
                                <label>{text[lang].customTheme[0]} ({buttonBg.startsWith("hsl") || buttonBg == "transparent" ? localBg : buttonBg}):</label>
                                <input
                                    type="color"
                                    value={buttonBg.startsWith("hsl") || buttonBg == "transparent" ? localBg : buttonBg}
                                    onChange={event => {
                                        setButtonBg(event.target.value);
                                    }}/>
                            </div>
                            <div>
                                <label>{text[lang].customTheme[1]} ({buttonFont}):</label>
                                <input
                                    type="color"
                                    value={buttonFont}
                                    onChange={event => {
                                        setButtonFont(event.target.value);
                                    }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <dialog ref={optionBlock} className="default-option-block" style={{
                    backgroundColor: "var(--modal-bg)",
                    opacity: "0.7",
                    width: "90%",
                    border: "none",
                }} />
            </dialog>
        </dialog>
    );
}

export default ThemeConstructor;
