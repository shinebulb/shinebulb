import React, {useEffect} from 'react';
import enableDarkMode from './enableDarkMode';

function About() {

    useEffect(() => {document.title = "about"}, []);
    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? enableDarkMode() : undefined);

    return (
        <>
            <h2>about</h2>
            <p className="p1">shinebulb is a fun little project by nurgali ernist and andrew aldor.</p>
            <p className="p1">matthew 5:14-16</p>
            <div className="links">
                <a href = "mailto:shinebulby@gmail.com?subject=contact">contact us</a>
                <a href="/home">back</a>
            </div>
        </>
    )
}

export default About