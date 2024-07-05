import React, {useEffect} from 'react';
import enableDarkMode from './enableDarkMode';

function Home() {

    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? enableDarkMode() : undefined);

    return (
        <>
            <div className="header">
                <p className="p2">shineb</p>
                <img src="img/logo2.png"/>
                <p className="p2">lb</p>
            </div>
            <div className="links">
                <a href="/play">PLAY</a>
                <a href="/settings">settings</a>
                <a href="/about">about</a>
                <a href="/support">support us</a>
            </div>
            <a href="https://github.com/nurgalinchik/shinebulb" target="_blank" id="source">source code</a>
        </>
    )
}

export default Home