import React, {useEffect} from 'react';
import themes from './assets/themes';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function Support() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[3];
    });
    
    const lang = parseInt(localStorage.getItem("langMode") === null ? languages.indexOf(window.navigator.language.slice(0, 2)) : parseInt(localStorage.getItem("langMode")));
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    return (
        <motion.div
            className='support'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <a className="donate-button" href="https://nowpayments.io/donation?api_key=YT62CT1-1NG4AQ3-HARDAGH-5VMQT4A" target="_blank" rel="noreferrer noopener">
                <span>{text[lang].donate}</span>
                <img src="img/donate.svg"/>
            </a>
            <div style={{height: "1rem"}}/>
            <a href="/">{text[lang].back}</a>
        </motion.div>
    )
}

export default Support