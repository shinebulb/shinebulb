import {useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function Support() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[3];
    });
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    return (
        <>
            <p className="p3">{text[lang].unavailable}</p>
            <div style={{height: "1rem"}}/>
            <a href="/">{text[lang].back}</a>
        </>
    )
}

export default Support