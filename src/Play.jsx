import React, {useState, useEffect, useRef} from 'react';
import themes from './assets/themes';
import textJSON from './assets/json/text.json';

function Play() {

    const [lang, setLang] = useState(0);
    const [theme, setTheme] = useState(0);

    useEffect(() => {
        themes[theme]();
        setLang(parseInt(localStorage.getItem("langMode")) || 0);
        setTheme(parseInt(localStorage.getItem("theme")) || 0);
        setText(parseInt(localStorage.getItem("classOn")) || 0);
        setPic((parseInt(localStorage.getItem("classOn")) || 0) ? "on" : "off");
        (parseInt(localStorage.getItem("classOn")) || 0) ? bulb.current.classList.add("on") : undefined;
        document.title = textJSON[lang].links[0].toLowerCase();
    });
    useEffect(() => setCount(parseInt(localStorage.getItem("countDisplay")) || 0), []);

    const [count, setCount] = useState(0);
    const [pic, setPic] = useState("off");
    const [text, setText] = useState(0);
    const bulb = useRef(null);
    const modal = useRef(null);

    function pictureChange() {
        setText(!text ? 1 : 0);
        setCount(!text ? c => c + 1 : count);
        setPic(!text ? "on" : "off");
        new Audio(!text ? "audio/on.mp3" : "audio/off.mp3").play();
        bulb.current.classList.toggle("on");
        localStorage.setItem("countDisplay", !text ? count + 1 : count);
        localStorage.setItem("classOn", Number(bulb.current.classList.contains("on")));
    }

    function resetCount() {
        modal.current.close()
        setCount(0);
        setPic("off");
        setText(0);
        new Audio("audio/off.mp3").play();
        localStorage.removeItem("countDisplay");
        localStorage.removeItem("classOn");
        bulb.current.classList.remove("on");
    }

    return (
        <div className="play">
            <h2>{textJSON[lang].headings[0]}</h2>
            <p className="p1" id="text">{textJSON[lang].text[text]}</p>
            <img ref={bulb} src={`img/${pic}.svg`} alt="the lightbulb" />
            <div className="controls">
                <button onClick={pictureChange}>{textJSON[lang].controls[0]}</button>
                <button onClick={() => modal.current.showModal()}>{textJSON[lang].controls[1]}</button>
            </div>
            <dialog ref={modal} className="confirm">
                <p>{textJSON[lang].confirm[0]}</p>
                <button onClick={resetCount}>{textJSON[lang].confirm[1]}</button>
                <button onClick={() => modal.current.close()}>{textJSON[lang].confirm[2]}</button>
            </dialog>
            <h2 id="counter">{count}</h2>
            <a href="/home">{textJSON[lang].back}</a>
        </div>
    )
}

export default Play