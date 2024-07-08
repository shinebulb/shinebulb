import React, {useState, useEffect} from 'react';
import darkTheme from './darkTheme';
import text from './assets/json/text.json';

function About() {

    const [lang, setLang] = useState(0);

    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? darkTheme() : undefined);
    useEffect(() => setLang(parseInt(localStorage.getItem("langMode")) || 0));
    useEffect(() => {document.title = text[lang].links[2]});

    return (
        <>
            <h2>{text[lang].headings[2]}</h2>
            <p className="p1">{text[lang].about[0]}</p>
            <p className="p1">{text[lang].about[1]}</p>
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">{text[lang].contact}</a>
                <a href="/home">{text[lang].back}</a>
            </div>
        </>
    )
}

export default About