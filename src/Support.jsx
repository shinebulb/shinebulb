import React, {useEffect} from 'react';
import enableDarkMode from './enableDarkMode';

function Support() {

    useEffect(() => {document.title = "support us"}, []);
    useEffect(() => localStorage.getItem("darkMode") == "enabled" ? enableDarkMode() : undefined);
    
    return (
        <>
            <p className="p3">This section is currently unavailable!</p>
            <div style={{height: "1rem"}}/>
            <a href="/home">back</a>
        </>
    )
}

export default Support