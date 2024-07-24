import {useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function About() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[2];
    });

    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    return (
        <div style={{width: "90%", textAlign: "center", margin: "auto"}}>
            <h2>{text[lang].headings[2]}</h2>
            <p className="p1">{text[lang].about[0]}</p>
            <div style={{height: "1rem"}} />
            <div className="about">
                <p className="p1">{text[lang].about[1]}</p>
                <p className="p1">{text[lang].about[2]}</p>
                <p className="p1">{text[lang].about[3]}</p>
                <p className="p1">{text[lang].about[4]}</p>
                <p className="p1">{text[lang].about[5]}</p>
                <p className="p1">{text[lang].about[6]}</p>
            </div>
            <div style={{height: "1rem"}} />
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">{text[lang].contact}</a>
                <a href="/">{text[lang].back}</a>
            </div>
        </div>
    )
}

export default About