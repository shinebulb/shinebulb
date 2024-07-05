import React, {useState, useEffect, useRef} from 'react';
import enableDarkMode from './enableDarkMode';

function Play() {

    useEffect(() => {document.title = "play"}, []);
    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? enableDarkMode() : undefined);

    const [count, setCount] = useState(0);
    const [pic, setPic] = useState("off");
    const [text, setText] = useState("sad :(");
    const bulb = useRef(null);

    function pictureChange() {
        setCount(c => c + 1);
        setPic(pic == "off" ? "on" : "off");
        setText(text == "sad :(" ? "happy!" : "sad :(");
        new Audio(pic == "off" ? "audio/on.mp3" : "audio/off.mp3").play();
        localStorage.setItem("countDisplay", count);
        bulb.current.classList.toggle("on");
    }

    function resetCount() {
        if (confirm(`Are you sure you want to reset the counter?`)) {
            setCount(0);
            setPic("off");
            setText("sad :(");
            new Audio("audio/off.mp3").play();
            localStorage.removeItem("countDisplay");
            bulb.current.classList.remove("on");
        }
    }

    useEffect(() => setCount(parseInt(localStorage.getItem("countDisplay")) + 1 || 0), []);

    return (
        <div className="play">
            <h2>the lightbulb</h2>
            <p className="p1" id="text">{text}</p>
            <img ref={bulb} src={`img/${pic}.svg`} alt="the lightbulb" />
            <div className="controls">
                <button onClick={pictureChange}>switch</button>
                <button onClick={resetCount}>reset</button>
            </div>
            <h2 id="counter">{count}</h2>
            <a href="/home">back</a>
        </div>
    )
}

export default Play