import React, {useRef} from 'react';
import themes from './assets/themes';
import paths from './assets/json/svg-paths.json';
import text from './assets/json/text.json';

function ThemeCard({savedState, savedUpdate, themeIndex, deleteRefs}) {

    const lang = parseInt(localStorage.getItem("langMode")) || 0;

    function openDelete() {
        for (let i = 0; i < deleteRefs.length; i++) {
            i === themeIndex ? deleteRefs[i].current.show() : deleteRefs[i].current.close();
        }
    }

    function deleteTheme() {
        savedUpdate(savedState.filter(element => savedState.indexOf(element) != themeIndex));
        localStorage.setItem("themes", JSON.stringify(savedState.filter(element => savedState.indexOf(element) != themeIndex)));
        deleteRefs[themeIndex].current.close();
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

    return (
        <div className="theme-card" style={{backgroundColor: savedState[themeIndex][0]}}>
            <p style={{color: savedState[themeIndex][1]}}>{`${text[lang].themeCard[0]} #${themeIndex + 1}`}</p>
            <div className="saved-controls">
                <button
                    title={text[lang].themeCard[1]}
                    style={{
                        backgroundColor: savedState[themeIndex][0],
                        border: `${savedState[themeIndex][1]} 3px solid`
                    }}
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
                    onClick={openDelete}
                >
                    <svg fill={savedState[themeIndex][1]} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.428 482.429" xmlSpace="preserve"><g><g><path d={paths.delete[0]}/><path d={paths.delete[1]}/><path d={paths.delete[2]}/><path d={paths.delete[3]}/></g></g></svg>
                </button>
                
                <dialog ref={deleteRefs[themeIndex]} id={`delete-ref-${(themeIndex + 2) % 2}`}>
                    <p>{text[lang].savedDialogs[1]}</p>
                    <button onClick={deleteTheme}>{text[lang].confirm[1]}</button>
                    <button onClick={() => deleteRefs[themeIndex].current.close()}>{text[lang].confirm[2]}</button>
                </dialog>
            </div>
        </div>
    )
}

export default ThemeCard