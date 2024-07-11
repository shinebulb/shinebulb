import React, {useState, useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function About() {

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);

    useEffect(() => {
        themes[theme]();
        setLang(parseInt(localStorage.getItem("langMode")) || 0);
        setTheme(parseInt(localStorage.getItem("theme")) || 0);
        {document.title = text[lang].links[2]};
    });

    return (
        <>
            <h2>{text[lang].headings[2]}</h2>
            <p className="p1">{text[lang].about[0]}</p>
            <div style={{height: "1rem"}} />
            <p className="p1">{text[lang].about[1]}</p>
            <p className="p1">{text[lang].about[2]}</p>
            <p className="p1">{text[lang].about[3]}</p>
            <p className="p1">{text[lang].about[4]}</p>
            <p className="p1">{text[lang].about[5]}</p>
            <p className="p1">{text[lang].about[6]}</p>
            <div style={{height: "1rem"}} />
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">{text[lang].contact}</a>
                <a href="/home">{text[lang].back}</a>
            </div>
        </>
    )
}

export default About