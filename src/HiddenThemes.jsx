import React, {useEffect} from 'react';
import HiddenCard from './HiddenC';
import themes from './assets/themes';
import text from './assets/json/text.json';
import colors from './assets/json/explore-colors.json';
import {motion} from 'framer-motion';

function HiddenThemes() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[6];
    });
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    function renderHidden() {

        const hiddenThemes = [];

        for (let i = 0; i < colors.length; i++) {
            if (localStorage.getItem(`display #${i + 1}`)) {
                hiddenThemes.push(
                    <HiddenCard
                        key={i}
                        themeIndex={i}
                    />
                )
            }
        }

        return hiddenThemes
    }

    return (
        <motion.div
            className='hidden'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div style={{height: "2rem"}}/>
            <h2 style={{fontSize: "1.7rem"}}>{text[lang].hiddenThemes}</h2>
            <div style={{height: "0.1rem"}}/>
            <div className="saved-display">
                <HiddenCard themeIndex={0}/>
            </div>
            <div style={{height: "1rem"}}/>
            <a href="/explore">{text[lang].back}</a>
            <div style={{height: "2rem"}}/>
        </motion.div>
    )
}

export default HiddenThemes