import React, {useState, useEffect, useRef} from 'react';
import themes from './assets/themes';
import modes from './assets/json/modes.json';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';
import noSaved from './assets/json/no-saved-themes.json';

function Settings() {

    useEffect(() => {
        document.title = text[lang].links[1];
        themes[theme]();
        if (localStorage.getItem("themes") === null) {
            localStorage.setItem("themes", JSON.stringify([]));
        }
    });

    const [lang, setLang] = useState(parseInt(localStorage.getItem("langMode")) || 0);
    const [theme, setTheme] = useState(parseInt(localStorage.getItem("theme")) || 0);
    const [localBg, setLocalBg] = useState(localStorage.getItem("bg") || "#2e5a97");
    const [localFont, setLocalFont] = useState(localStorage.getItem("font") || "#f1f1f1");
    const [currentThemes, setCurrentThemes] = useState(JSON.parse(localStorage.getItem("themes")));
    const [themeNames, setThemeNames] = useState(JSON.parse(localStorage.getItem("themeNames")) || [`${text[lang].theme[1]} #1`, `${text[lang].theme[1]} #2`, `${text[lang].theme[1]} #3`, `${text[lang].theme[1]} #4`, `${text[lang].theme[1]} #5`, `${text[lang].theme[1]} #6`, `${text[lang].theme[1]} #7`, `${text[lang].theme[1]} #8`, `${text[lang].theme[1]} #9`, `${text[lang].theme[1]} #10`]);
    const [saveIndex, setSaveIndex] = useState(1);
    
    const custom = useRef(null);
    const saved = useRef(null);
    const saveDialog = useRef(null);

    const deleteConfirmRefs = [];
    const paintConfirmRefs = [];
    const renameRefs = [];
    
    for (let i = 0; i < 10; i++) {
        deleteConfirmRefs.push(useRef(null));
        paintConfirmRefs.push(useRef(null));
        renameRefs.push(useRef(null));
    }

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

    function saveTheme(colors) {

        function includesDeep(array, value) {
            if (array !== null) {
                return array.some((subArray) => {
                    return subArray.every(
                        (subArrayElem, index) => subArrayElem === value[index]
                    );
                });
            }
        }

        if (includesDeep(currentThemes, colors)) {
            setSaveIndex(0);
        }
        else {
            setCurrentThemes([...JSON.parse(localStorage.getItem("themes")), colors]);
            localStorage.setItem("themes", JSON.stringify([...JSON.parse(localStorage.getItem("themes")), colors]));
            setSaveIndex(1);
        }

        saveDialog.current.showModal();
        const intervalId = setInterval(() => {
            saveDialog.current.close();
            clearInterval(intervalId);
        }, 3_000);
    }

    function renderSaved() {

        function deleteTheme(index) {
            setCurrentThemes(currentThemes.filter(element => currentThemes.indexOf(element) != index));
            localStorage.setItem("themes", JSON.stringify(currentThemes.filter(element => currentThemes.indexOf(element) != index)));
            deleteConfirmRefs[index].current.close();
        }

        function paintTheme(index) {
            setTheme(3);
            saved.current.close();
            localStorage.setItem("theme", 3);
            localStorage.setItem("bg", currentThemes[index][0]);
            localStorage.setItem("font", currentThemes[index][1]);
            themes[theme]();
        }

        function renameTheme(event, index) {
            const left = themeNames.slice(0, index);
            const right = themeNames.slice(index + 1);
            setThemeNames([...left, event.target.value, ...right]);
            localStorage.setItem("themeNames", JSON.stringify([...left, event.target.value, ...right]));
        }

        const savedThemes = [];

        if (JSON.parse(localStorage.getItem("themes")) !== null) {
            for (let i = 0; i < JSON.parse(localStorage.getItem("themes")).length; i++) {
                let savedTheme = currentThemes[i];
                savedThemes.push(
                    <div key={i} className="line" style={{backgroundColor: savedTheme[0], color: savedTheme[1]}}>
                        <p>{themeNames[i]}</p>
                        <button onClick={() => {
                            renameRefs[i].current.show();
                            for (let j = 0; j < savedThemes.length; j++) {
                                paintConfirmRefs[j].current.close();
                                deleteConfirmRefs[j].current.close();
                                j !== i ? renameRefs[j].current.close() : undefined;
                            }
                        }} style={{border: `${savedTheme[1]} 2px solid`}} title={text[lang].theme[2]}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]} fill={savedTheme[1]}/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]} fill={savedTheme[1]}/></svg>
                        </button>
                        <button onClick={() => {
                            paintConfirmRefs[i].current.show();
                            for (let j = 0; j < savedThemes.length; j++) {
                                deleteConfirmRefs[j].current.close();
                                renameRefs[j].current.close();
                                j !== i ? paintConfirmRefs[j].current.close() : undefined;
                            }
                        }} style={{border: `${savedTheme[1]} 2px solid`}} title={text[lang].theme[3]}>
                            <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" fill={savedTheme[1]} d={paths.paint}/></svg>
                        </button>
                        <button onClick={() => {
                            deleteConfirmRefs[i].current.show();
                            for (let j = 0; j < savedThemes.length; j++) {
                                paintConfirmRefs[j].current.close();
                                renameRefs[j].current.close();
                                j !== i ? deleteConfirmRefs[j].current.close() : undefined;
                            }
                        }} style={{border: `${savedTheme[1]} 2px solid`}} title={text[lang].theme[4]}>
                            <svg fill={savedTheme[1]} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g><g><path d={paths.delete[0]}/><path d={paths.delete[1]}/><path d={paths.delete[2]}/><path d={paths.delete[3]}/></g></g></svg>
                        </button>
                        <dialog ref={deleteConfirmRefs[i]} id="confirmDelete">
                            <p>{text[lang].savedThemeChange[0]}</p>
                            <button onClick={() => deleteTheme(i)}>{text[lang].confirm[1]}</button>
                            <button onClick={() => deleteConfirmRefs[i].current.close()}>{text[lang].confirm[2]}</button>
                        </dialog>
                        <dialog ref={paintConfirmRefs[i]} id="confirmPaint">
                            <p>{text[lang].savedThemeChange[1]}</p>
                            <button onClick={() => {
                                paintTheme(i);
                                paintConfirmRefs[i].current.close();
                            }}>{text[lang].confirm[1]}</button>
                            <button onClick={() => paintConfirmRefs[i].current.close()}>{text[lang].confirm[2]}</button>
                        </dialog>
                        <dialog ref={renameRefs[i]} id="rename">
                            <input value={themeNames[i]} onChange={event => renameTheme(event, i)}/>
                            <button onClick={() => {
                                renameRefs[i].current.close();
                            }} style={{width: "44%", marginTop: "0.6rem"}}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.apply} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            <button onClick={() => renameRefs[i].current.close()} style={{width: "44%", marginTop: "0.6rem"}}>
                                <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                            </button>
                        </dialog>
                    </div>
                );
            }
        }


        return (
            savedThemes.length !== 0 ?
            savedThemes :
            <div className="no-themes">
                <img src={`img/no-saved-themes/${noSaved[Math.floor(Math.random() * noSaved.length)]}.svg`} />
                <div>
                    <p>{text[lang].theme[0]}</p>
                </div>
            </div>
        );
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
                <button onClick={customTheme} style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[0]}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.apply} stroke={localFont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button onClick={() => {
                    custom.current.close();
                    saveDialog.current.close();
                }} style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[1]}><svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={localFont} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg></button>
                <button onClick={() => saveTheme([localBg, localFont])} style={{backgroundColor: localBg, border: `${localFont} 3px solid`}} title={text[lang].themeControls[2]}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} stroke={localFont} strokeWidth="2" strokeLinejoin="round"/></svg></button></div>
            </dialog>
            <dialog className="saveUpdate" ref={saveDialog}  style={{backgroundColor: saveIndex ? "#b7ffb0" : "#ffb0c5", color: saveIndex ? "#003e0a" : "#4b0134"}}>
                <p>{text[lang].saved[saveIndex]}</p>
                <button onClick={() => saveDialog.current.close()}>
                    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="work-case" fill={saveIndex ? "#003e0a" : "#4b0134"} transform="translate(91.520000, 91.520000)"><polygon id="Close" points={paths.cancel} /></g></g></svg>
                </button>
            </dialog>
            <dialog className="saved" ref={saved}>
                <h3>{text[lang].savedThemes[0]}</h3>
                <h4>{`${JSON.parse(localStorage.getItem("themes")) === null ? 0 : JSON.parse(localStorage.getItem("themes")).length}/10 ${text[lang].savedThemes[1]}`}</h4>
                <h4>{text[lang].working}</h4>
                <div className="lines">
                    <hr/>{renderSaved()}<hr/>
                </div>
                <button onClick={() => saved.current.close()}>{text[lang].exit}</button>
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