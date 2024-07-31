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
    for (let i = 0; i < custom[1].length; i++) {
        if ((i !== 6) && (i !== 7)) {
            document.documentElement.style.setProperty(custom[1][i], custom[0][custom[1][i]] == "bg" ? localStorage.getItem("bg") : localStorage.getItem("font"));
        }
        else if (i === 6) {
            document.documentElement.style.setProperty(custom[1][i], `${localStorage.getItem("font")} 3px solid`);
        }
        else if (i === 7) {
            document.documentElement.style.setProperty(custom[1][i], `${localStorage.getItem("font")} 1px solid`);
        }
    }
}

const themes = [
    systemTheme, lightTheme, darkTheme, customTheme, () => {}
]

export default themes