import React, {useEffect} from 'react';
import ThemeSuggestion from './ThemeSuggestion';
import themes from './assets/themes';
import text from './assets/json/text.json';
import {motion} from 'framer-motion';

function Explore() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[4];
    });
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

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
            <ThemeSuggestion/>
            <div style={{height: "1rem"}}/>
            <a href="/settings">{text[lang].back}</a>
            <div style={{height: "2rem"}}/>
        </motion.div>
    )
}

export default Explore