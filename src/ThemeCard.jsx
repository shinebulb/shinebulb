import React, {useRef} from 'react';
import themes from './assets/themes';
import paths from './assets/json/svg-paths.json';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';

function ThemeCard({savedState, nameStates, savedUpdate, nameUpdates, themeIndex}) {

    const lang = parseInt(localStorage.getItem("langMode") === null ? (languages.includes(window.navigator.language.slice(0, 2)) ? languages.indexOf(window.navigator.language.slice(0, 2)) : 0) : parseInt(localStorage.getItem("langMode")));

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
                        backgroundColor: savedState[themeIndex][0],
                        border: `${savedState[themeIndex][1]} 3px solid`
                    }}
                    onClick={() => renameRef.current.showModal()}
                >
                    <svg fill={savedState[themeIndex][1]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d={paths.rename[0]}/><path fillRule="evenodd" clipRule="evenodd" d={paths.rename[1]}/></svg>
                </button>
                <button
                    title={text[lang].themeCard[2]}
                    style={{
                        backgroundColor: savedState[themeIndex][0],
                        border: `${savedState[themeIndex][1]} 3px solid`
                    }}
                    onClick={paintTheme}
                >
                    <svg fill={savedState[themeIndex][1]} version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve"><path className="bentblocks_een" d={paths.paint}/></svg>
                </button>
                <button
                    title={text[lang].themeCard[3]}
                    style={{
                        backgroundColor: savedState[themeIndex][0],
                        border: `${savedState[themeIndex][1]} 3px solid`
                    }}
                    onClick={() => deleteRef.current.showModal()}
                >
                    <svg fill={savedState[themeIndex][1]} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g><g><path d={paths.delete[0]}/><path d={paths.delete[1]}/><path d={paths.delete[2]}/><path d={paths.delete[3]}/></g></g></svg>
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