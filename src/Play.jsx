import React, {useState, useEffect, useRef} from 'react';
import enableDarkMode from './enableDarkMode';
import textJSON from './assets/json/text.json';

function Play() {

    const [lang, setLang] = useState(0);

    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? enableDarkMode() : undefined);
    useEffect(() => setLang(parseInt(localStorage.getItem("langMode")) || 0));
    useEffect(() => {document.title = textJSON[lang].links[0]});

    const [count, setCount] = useState(0);
    const [pic, setPic] = useState("off");
    const [text, setText] = useState(0);
    const bulb = useRef(null);

    function pictureChange() {
        setCount(c => c + 1);
        setPic(pic == "off" ? "on" : "off");
        setText(text === 0 ? 1 : 0);
        new Audio(pic == "off" ? "audio/on.mp3" : "audio/off.mp3").play();
        localStorage.setItem("countDisplay", count);
        bulb.current.classList.toggle("on");
    }

    function resetCount() {
        if (confirm(textJSON[lang].confirm)) {
            setCount(0);
            setPic("off");
            setText(0);
            new Audio("audio/off.mp3").play();
            localStorage.removeItem("countDisplay");
            bulb.current.classList.remove("on");
        }
    }

    useEffect(() => setCount(parseInt(localStorage.getItem("countDisplay")) + 1 || 0), []);

    return (
        <div className="play">
            <h2>{textJSON[lang].headings[0]}</h2>
            <p className="p1" id="text">{textJSON[lang].text[text]}</p>
            <img ref={bulb} src={`img/${pic}.svg`} alt="the lightbulb" />
            <div className="controls">
                <button onClick={pictureChange}>{textJSON[lang].controls[0]}</button>
                <button onClick={resetCount}>{textJSON[lang].controls[1]}</button>
            </div>
            <h2 id="counter">{count}</h2>
            <a href="/home">{textJSON[lang].back}</a>
        </div>
    )
}

export default Play