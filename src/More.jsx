import text from './assets/json/text.json';

function More({ options }) {

    const lang = parseInt(localStorage.getItem("langMode")) || 0;

    return (
        <dialog className="more" ref={options}>
            <div className="options">
                <a href="/saved">
                    {text[lang].saved}
                    <span>{text[lang].optionDescriptions[0]}</span>
                </a>
                <hr />
                <a href="/explore">
                    {text[lang].themeSuggestions}
                    <span>{text[lang].optionDescriptions[1]}</span>
                </a>
                <hr />
                <button onClick={() => options.current.close()}>{text[lang].back}</button>
            </div>
        </dialog>
    )
}

export default More