import hsl from 'hex-to-hsl';
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
    const buttonBg = localStorage.getItem("buttonBg");
    const buttonFont = localStorage.getItem("buttonFont");
    const hoverCoef = localStorage.getItem("hoverCoef");
    
    const [h, s, l] = hsl(buttonBg);

    const customProperties = [
        bg,
        buttonFont,
        bg,
        buttonBg,
        hoverCoef != hsl(bg)[2] ? `hsl(${hsl(bg)[0]}, ${hsl(bg)[1]}%, ${hoverCoef}%)` : `hsl(${h}, ${s}%, ${hoverCoef}%)`,
        buttonBg,
        `${font} 3px solid`,
        `${font} 1px solid`,
        `${buttonFont} 3px solid`,
        `${buttonFont} 1px solid`,
        hoverCoef != hsl(bg)[2] ? `hsl(${hsl(bg)[0]}, ${hsl(bg)[1]}%, ${hoverCoef}%)` : `hsl(${h}, ${s}%, ${hoverCoef}%)`,
        font,
        font,
        font
    ]

    for (let i = 0; i < customProperties.length; i++) {
        document.documentElement.style.setProperty(custom[i], customProperties[i]);
    }
}

const themes = [
    systemTheme, lightTheme, darkTheme, customTheme, () => {}
]

export default themes