import React, {useState, useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function Support() {

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);

    useEffect(() => {
        themes[theme]();
        setLang(parseInt(localStorage.getItem("langMode")) || 0);
        setTheme(parseInt(localStorage.getItem("theme")) || 0);
        {document.title = text[lang].links[3]};
    });

    return (
        <>
            <p className="p3">{text[lang].unavailable}</p>
            <div style={{height: "1rem"}}/>
            <a href="/home">{text[lang].back}</a>
        </>
    )
}

export default Support