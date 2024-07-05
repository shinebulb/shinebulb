import React, {useState, useEffect} from 'react';
import enableDarkMode from './enableDarkMode';

function Settings() {

    useEffect(() => {document.title = "settings"}, []);

    const [mode, setMode] = useState("off");
    let darkMode = localStorage.getItem("darkMode");

    function advanceDarkMode() {
        enableDarkMode();
        setMode("on");
    }

    function disableDarkMode() {
        document.body.classList.remove("darkMode");
        localStorage.setItem("darkMode", null);
        setMode("off");
    }

    useEffect(() => darkMode === "enabled" ? advanceDarkMode() : undefined);

    function modeToggle() {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode != "enabled") {
            advanceDarkMode();
        }
        else {
            disableDarkMode();
        }
    }

    return (
        <div className="settings">
            <h2>settings</h2>
            <div className="container">
                <label htmlFor="modeToggle" className="settingName">dark mode</label>
                <button id="modeToggle" onClick={modeToggle}>{mode}</button>
            </div>
            <div style={{height: "5rem"}}/>
            <a href="/home">back</a>
        </div>
    )
}

export default Settings