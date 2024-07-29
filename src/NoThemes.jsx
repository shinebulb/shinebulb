import text from './assets/json/text.json';

function NoThemes() {

    const lang = parseInt(localStorage.getItem("langMode")) || 0;
    const images = ["desert", "waterfall", "cave", "hills", "city"];

    return (
        <div className="no-themes">
            <img src={
                Math.floor(Math.random() * 100) === 52
                ? "img/no themes/waltuh.png"
                : `img/no themes/${images[Math.floor(Math.random() * images.length)]}.svg`
            }/>
            <p>{text[lang].noThemes}</p>
        </div>
    )
}

export default NoThemes