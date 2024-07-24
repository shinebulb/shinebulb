import React, {useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function Home() {

    useEffect(() => themes[theme]());

    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

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