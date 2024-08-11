import React, {useEffect} from 'react';
import ThemeSuggestion from './ThemeSuggestion';
import themes from './assets/themes';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import {motion} from 'framer-motion';

function Explore() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[4];
    });
    
    const lang = parseInt(localStorage.getItem("langMode") === null ? languages.indexOf(window.navigator.language.slice(0, 2)) : parseInt(localStorage.getItem("langMode")));
    const theme = parseInt(localStorage.getItem("theme")) || 0;
    
    function renderExplore() {
        const suggestionCards = []
        for (let i = 0; i < text[lang].names.length; i++) {
            suggestionCards.push(
                <ThemeSuggestion
                    key={i}
                    themeIndex={i}
                />
            );
        }
        return suggestionCards
    }

    return (
        <motion.div
            className='explore'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div style={{height: "2rem"}}/>
            <h2 style={{fontSize: "1.7rem"}}>{text[lang].themeSuggestions}</h2>
            <div style={{height: "0.1rem"}}/>
            <div className="saved-display">
                {renderExplore()}
            </div>
            <a className="shadow-realm" href="/hidden">
                <div className="description">
                    <h2>{text[lang].hiddenThemes}</h2>
                    <p>{text[lang].hiddenDescription}</p>
                </div>
            </a>
            <div style={{height: "1rem"}}/>
            <a href="/settings">{text[lang].back}</a>
            <div style={{height: "2rem"}}/>
        </motion.div>
    )
}

export default Explore