import custom from './json/custom.json';

const systemTheme = () => {
    window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ?
    darkTheme() : lightTheme();
}

const lightTheme = () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}

const darkTheme = () => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
}

const customTheme = () => {

    document.body.classList.remove("dark");
    document.body.classList.remove("light");

    const bg = localStorage.getItem("bg");
    const font = localStorage.getItem("font");

    const customProperties = [bg, font, bg, bg, bg, bg, `${font} 3px solid`, `${font} 1px solid`, bg, font, font, font]

    for (let i = 0; i < customProperties.length; i++) {
        document.documentElement.style.setProperty(custom[i], customProperties[i]);
    }
}

const themes = [
    systemTheme, lightTheme, darkTheme, customTheme, () => {}
]

export default themes