export default function darkTheme() {
    document.body.classList.add("darkMode");
    localStorage.setItem("darkMode", "enabled");
}