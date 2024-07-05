export default function enableDarkMode() {
    document.body.classList.add("darkMode");
    localStorage.setItem("darkMode", "enabled");
}