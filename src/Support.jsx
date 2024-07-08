import React, {useState, useEffect} from 'react';
import darkTheme from './darkTheme';
import text from './assets/json/text.json';

function Support() {

    const [lang, setLang] = useState(0);

    useEffect(() => {document.title = text[lang].links[3]});
    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? darkTheme() : undefined);
    useEffect(() => setLang(parseInt(localStorage.getItem("langMode")) || 0));

    return (
        <>
            <p className="p3">{text[lang].unavailable}</p>
            <div style={{height: "1rem"}}/>
            <a href="/home">{text[lang].back}</a>
        </>
    )
}

export default Support