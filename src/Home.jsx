import React, {useState, useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function Home() {

    useEffect(() => {
        themes[theme]();
        setLang(parseInt(localStorage.getItem("langMode")) || 0);
        setTheme(parseInt(localStorage.getItem("theme")) || 0);
    });

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);

    return (
        <>
            <div className="header">
                <p className="p2">shineb</p><img src="img/logo2.png"/><p className="p2">lb</p>
            </div>
            <div className="links">
                <a href="/play">{text[lang].links[0]}</a>
                <a href="/settings">{text[lang].links[1]}</a>
                <a href="/about">{text[lang].links[2]}</a>
                <a href="/support">{text[lang].links[3]}</a>
            </div>
            <a href="https://github.com/nurgalinchik/shinebulb" target="_blank" id="source">{text[lang].source}</a>
        </>
    )
}

export default Home