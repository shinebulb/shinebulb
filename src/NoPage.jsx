import React, {useEffect} from 'react';
import themes from './assets/themes';
import languages from './assets/json/languages.json';
import text from './assets/json/text.json';
import { motion } from 'framer-motion';

function NoPage() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[7];
    });

    const lang = parseInt(localStorage.getItem("langMode") === null ? languages.indexOf(window.navigator.language.slice(0, 2)) : parseInt(localStorage.getItem("langMode")));
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    const images = ["desert", "waterfall", "cave", "hills", "city"];
    
    return (
        <motion.div
            className='no-page'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div className="no-page-text">
                <div>
                    <p style={{fontWeight: "bold"}}>
                        {text[lang].pageNotFound[0]}
                    </p>
                    <p style={{fontSize: "1.1rem", fontStyle: "italic", margin: "0.5rem 0"}}>
                        {text[lang].pageNotFound[1]}
                    </p>
                    <div className="no-page-links">
                        <a href="/">{text[lang].home}</a>
                        <a href="/play">{text[lang].links[0].toLowerCase()}</a>
                        <a href="/settings">{text[lang].links[1]}</a>
                        <a href="/about">{text[lang].links[2]}</a>
                        <a href="/support">{text[lang].links[3]}</a>
                    </div>
                </div>
                <img title="sauron" src="https://i.pinimg.com/originals/20/bc/ac/20bcacc9571e85a27bef9cbfad961b4a.png" />
            </div>
        </motion.div>
    )
}

export default NoPage