import React, {useState, useEffect} from 'react';
import ThemeCard from './ThemeCard';
import NoThemes from './NoThemes';
import themes from './assets/themes';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import {motion} from 'framer-motion';

function SavedThemes() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[5];
    });
    
    const lang = parseInt(localStorage.getItem("langMode") === null ? languages.indexOf(window.navigator.language.slice(0, 2)) : parseInt(localStorage.getItem("langMode")));
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    const [currentThemes, setCurrentThemes] = useState(JSON.parse(localStorage.getItem("themes")) || []);
    const [themeNames, setThemeNames] = useState(JSON.parse(localStorage.getItem("themeNames")) || []);

    function renderCards() {
        const themeDisplay = [];
        for (let i = 0; i < currentThemes.length; i++) {
            themeDisplay.push(
                <ThemeCard
                    key={i}
                    savedState={currentThemes}
                    nameStates={themeNames}
                    savedUpdate={setCurrentThemes}
                    nameUpdates={setThemeNames}
                    themeIndex={i}
                />
            );
        }
        return themeDisplay
    }    
    
    return (
        <motion.div
            className='saved'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div style={{height: "2rem"}}/>
            <h2 style={{fontSize: "1.7rem"}}>{text[lang].savedThemes[0]}</h2>
            <h3 style={{color: "var(--font)", fontStyle: "italic"}}>
                {`${currentThemes.length} ${text[lang].savedThemes[1]}`}
            </h3>
            <div style={{height: "0.1rem"}}/>
            {
                currentThemes.length > 0 ?
                <div className="saved-display">{renderCards()}</div>
                : <NoThemes/>
            }
            <div style={{height: "1rem"}}/>
            <a href="/settings">{text[lang].back}</a>
            <div style={{height: "2rem"}}/>
        </motion.div>
    )
}

export default SavedThemes