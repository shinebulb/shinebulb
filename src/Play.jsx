import React, {useState, useEffect, useRef} from 'react';
import themes from './assets/themes';
import textJSON from './assets/json/text.json';
import { motion } from 'framer-motion'

function Play() {
    
    useEffect(() => {
        themes[theme]();
        document.title = textJSON[lang].links[0].toLowerCase();
        if (parseInt(localStorage.getItem("classOn"))) {
           bulb.current.classList.add("on");
        }
    });

    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    const [count, setCount] = useState(parseInt(localStorage.getItem("countDisplay")) || 0);
    const [pic, setPic] = useState((parseInt(localStorage.getItem("classOn")) || 0) ? "on" : "off");
    const [text, setText] = useState(parseInt(localStorage.getItem("classOn")) || 0);

    const bulb = useRef(null);
    const modal = useRef(null);

    function pictureChange() {
        setText(Number(!text));
        setCount(c => c + !text);
        setPic(!text ? "on" : "off");
        new Audio(!text ? "audio/on.mp3" : "audio/off.mp3").play();
        bulb.current.classList.toggle("on");
        localStorage.setItem("countDisplay", count + !text);
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
        <motion.div 
            className="play"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
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
            <a href="/">{textJSON[lang].back}</a>
        </motion.div>
    )
}

export default Play