import text from './assets/json/text.json';
import paths from './assets/json/svg-paths.json';

function More({ options }) {

    const lang = parseInt(localStorage.getItem("langMode")) || 0;

    return (
        <dialog className="more" ref={options}>
            <div className="options">
                <a href="/saved">
                    <p>
                        <svg style={{height: "2rem"}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.save} strokeWidth="2" strokeLinejoin="round"/></svg>
                        {text[lang].saved}
                    </p>
                    <span>{text[lang].optionDescriptions[0]}</span>
                </a>
                <hr />
                <a href="/explore">
                    <p>
                        <svg style={{height: "2.5rem"}} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d={paths.explore} strokeWidth="1.2"/></svg>
                        {text[lang].themeSuggestions}
                    </p>
                    <span>{text[lang].optionDescriptions[1]}</span>
                </a>
                <hr />
                <button onClick={() => options.current.close()}>{text[lang].back}</button>
            </div>
        </dialog>
    )
}

export default More