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

    const customProperties = [
        localStorage.getItem("bg"),
        localStorage.getItem("font"),
        localStorage.getItem("bg"),
        localStorage.getItem("bg"),
        localStorage.getItem("bg"),
        localStorage.getItem("bg"),
        `${localStorage.getItem("font")} 3px solid`,
        `${localStorage.getItem("font")} 1px solid`,
        localStorage.getItem("bg"),
        localStorage.getItem("font"),
        localStorage.getItem("font"),
        localStorage.getItem("font"),
    ]

    for (let i = 0; i < customProperties.length; i++) {
        document.documentElement.style.setProperty(Object.keys(custom)[i], customProperties[i]);
    }
}

const themes = [
    systemTheme, lightTheme, darkTheme, customTheme, () => {}
]

export default themes