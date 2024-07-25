import React, {useEffect} from 'react';
import themes from './assets/themes';
import text from './assets/json/text.json';

function Support() {

    useEffect(() => {
        themes[theme]();
        document.title = text[lang].links[3];
    });
    
    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const theme = parseInt(localStorage.getItem("theme")) || 0;

    return (
        <>
            <a className="donate-button" href="https://nowpayments.io/donation?api_key=YT62CT1-1NG4AQ3-HARDAGH-5VMQT4A" target="_blank" rel="noreferrer noopener">
                <span>{text[lang].donate}</span>
                <img src="img/donate.svg"/>
            </a>
            <div style={{height: "1rem"}}/>
            <a href="/">{text[lang].back}</a>
        </>
    )
}

export default Support