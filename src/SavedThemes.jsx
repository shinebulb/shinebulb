import React, {useEffect} from 'react';
import ThemeCard from './ThemeCard';
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

    return (
        <motion.div
            className='saved'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>saved themes</h2>
            <h3>0/10 space used</h3>
            <ThemeCard/>
            <div style={{height: "3rem"}}/>
            <a href="/settings">{text[lang].back}</a>
        </motion.div>
    )
}

export default SavedThemes