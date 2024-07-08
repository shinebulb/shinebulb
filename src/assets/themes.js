const lightTheme = () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}

const darkTheme = () => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
}

const prefersDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const themes = [
    () => prefersDark ? darkTheme() : lightTheme(),
    lightTheme,
    darkTheme
]

export default themes