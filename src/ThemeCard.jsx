import React, {useState, useRef} from 'react';
import hsl from 'hex-to-hsl';
import themes from './assets/themes';
import paths from './assets/json/svg-paths.json';
import text from './assets/json/text.json';

function ThemeCard({savedState, nameStates, savedUpdate, nameUpdates, themeIndex}) {

    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    
    const [hover, setHover] = useState([false, false, false]);

    const renameRef = useRef(null);
    const inputRef = useRef(null);
    const deleteRef = useRef(null);

    function renameTheme() {
        nameUpdates(nameStates.map(element => nameStates.indexOf(element) === themeIndex ? inputRef.current.value : element));
        localStorage.setItem("themeNames", JSON.stringify(nameStates.map(element => nameStates.indexOf(element) === themeIndex ? inputRef.current.value : element)));
        renameRef.current.close();
    }
    
    function paintTheme() {
        localStorage.setItem("theme", 3);
        localStorage.setItem("bg", savedState[themeIndex][0]);
        localStorage.setItem("font", savedState[themeIndex][1]);
        localStorage.setItem("buttonBg", savedState[themeIndex][2]);
        localStorage.setItem("buttonFont", savedState[themeIndex][3]);
        if (savedState[themeIndex][4] == hsl(savedState[themeIndex][0])[2]) {
            localStorage.setItem("hoverCoef", savedState[themeIndex][4]);
        }
        else {
            localStorage.setItem("hoverCoef", hsl(savedState[themeIndex][2])[2]);
        }
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        themes[3]();
    }

    function deleteTheme() {
        savedUpdate(savedState.filter(element => savedState.indexOf(element) !== themeIndex));
        localStorage.setItem("themes", JSON.stringify(savedState.filter(element => savedState.indexOf(element) !== themeIndex)));
        nameUpdates(nameStates.filter(element => nameStates.indexOf(element) !== themeIndex));
        localStorage.setItem("themeNames", JSON.stringify(nameStates.filter(element => nameStates.indexOf(element) !== themeIndex)));
        deleteRef.current.close();
    }

    return (
        <div className="theme-card" style={{backgroundColor: savedState[themeIndex][0]}}>
            <p style={{color: savedState[themeIndex][1]}}>{nameStates[themeIndex]}</p>
            <div className="saved-controls">
                <button
                    title={text[lang].themeCard[1]}
                    style={{
                        backgroundColor: hover[0] ? `hsl(${hsl(savedState[themeIndex][0])[0]}, ${hsl(savedState[themeIndex][0])[1]}%, ${savedState[themeIndex][4]}%)` : savedState[themeIndex][2],
                        border: `${savedState[themeIndex][3]} 3px solid`
                    }}
                    onClick={() => renameRef.current.showModal()}
                    onMouseEnter={() => {
                        if (savedState[themeIndex][4] != hsl(savedState[themeIndex][0])[2]) setHover([true, false, false]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg fill={savedState[themeIndex][3]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]}/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]}/></svg>
                </button>
                <button
                    title={text[lang].themeCard[2]}
                    style={{
                        backgroundColor: hover[1] ? `hsl(${hsl(savedState[themeIndex][0])[0]}, ${hsl(savedState[themeIndex][0])[1]}%, ${savedState[themeIndex][4]}%)` : savedState[themeIndex][2],
                        border: `${savedState[themeIndex][3]} 3px solid`
                    }}
                    onClick={paintTheme}
                    onMouseEnter={() => {
                        if (savedState[themeIndex][4] != hsl(savedState[themeIndex][0])[2]) setHover([false, true, false]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg fill={savedState[themeIndex][3]} version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" d={paths.paint}/></svg>
                </button>
                <button
                    title={text[lang].themeCard[3]}
                    style={{
                        backgroundColor: hover[2] ? `hsl(${hsl(savedState[themeIndex][0])[0]}, ${hsl(savedState[themeIndex][0])[1]}%, ${savedState[themeIndex][4]}%)` : savedState[themeIndex][2],
                        border: `${savedState[themeIndex][3]} 3px solid`
                    }}
                    onClick={() => deleteRef.current.showModal()}
                    onMouseEnter={() => {
                        if (savedState[themeIndex][4] != hsl(savedState[themeIndex][0])[2]) setHover([false, false, true]);
                    }}
                    onMouseLeave={() => setHover([false, false, false])}
                >
                    <svg fill={savedState[themeIndex][3]} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g><g><path d={paths.delete[0]}/><path d={paths.delete[1]}/><path d={paths.delete[2]}/><path d={paths.delete[3]}/></g></g></svg>
                </button>
                
                <dialog ref={renameRef} className="confirm">
                        <input type="text" ref={inputRef} placeholder={text[lang].savedDialogs[0]}/>
                        <button onClick={renameTheme}>{text[lang].themeControls[0]}</button>
                        <button onClick={() => renameRef.current.close()}>{text[lang].themeControls[1]}</button>
                </dialog>
                <dialog ref={deleteRef} className="confirm">
                    <p>{text[lang].savedDialogs[1]}</p>
                    <button onClick={deleteTheme}>{text[lang].confirm[1]}</button>
                    <button onClick={() => deleteRef.current.close()}>{text[lang].confirm[2]}</button>
                </dialog>
            </div>
        </div>
    )
}

export default ThemeCard