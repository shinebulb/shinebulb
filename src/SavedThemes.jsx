import React, {useState, useEffect} from 'react';
import ThemeCard from './ThemeCard';
import NoThemes from './NoThemes';
import themes from './assets/themes';
import text from './assets/json/text.json';
import {motion} from 'framer-motion';

function SavedThemes() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[5];
    });
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    const [currentThemes, setCurrentThemes] = useState(JSON.parse(localStorage.getItem("themes")) || []);

    function renderCards() {
        const themeDisplay = [];
        for (let i = 0; i < currentThemes.length; i++) {
            themeDisplay.push(
                <ThemeCard
                    key={i}
                    savedState={currentThemes}
                    savedUpdate={setCurrentThemes}
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
            <h2 style={{fontSize: "1.7rem"}}>{text[lang].savedThemes[0]}</h2>
            <h3 style={{color: "var(--font)", fontStyle: "italic"}}>
                {`${currentThemes.length} ${text[lang].savedThemes[1]}`}
            </h3>
            <div style={{height: "0.1rem"}}/>
            <div className="saved-display">
                {currentThemes.length > 0 ? renderCards() : <NoThemes/>}
            </div>
            <div style={{height: "1rem"}}/>
            <a href="/settings">{text[lang].back}</a>
        </motion.div>
    )
}

export default SavedThemes