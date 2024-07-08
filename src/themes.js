const themes = [
    () => {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    },
    () => {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    }
]

export default themes