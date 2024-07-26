import React, {useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

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
            <h2>{lang ? "в разработке!" : "in progress!"}</h2>
            <a href="/settings">{text[lang].back}</a>
        </motion.div>
    )
}

export default Explore