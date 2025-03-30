const themeSelect = document.getElementById("themeSelect");
// Function to apply the selected theme
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#fff";
    } else if (theme === "blue") {
        document.body.style.backgroundColor = "#007BFF";
        document.body.style.color = "#fff";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
    }
}
// Load the theme from sessionStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = sessionStorage.getItem("theme") || "light"; // Default to "light"
    themeSelect.value = savedTheme; // Set dropdown to saved value
    applyTheme(savedTheme); // Apply theme
});
// Event listener for theme change
themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    sessionStorage.setItem("theme", selectedTheme); // Store in sessionStorage
    applyTheme(selectedTheme); // Apply the selected theme
});
