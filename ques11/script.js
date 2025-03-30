const noteArea = document.getElementById("noteArea");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
// Load notes from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        noteArea.value = savedNotes;
    }
});
// Save notes to localStorage
saveBtn.addEventListener("click", () => {
    const notes = noteArea.value.trim(); // Trim to remove unnecessary spaces
    if (notes === "") {
        alert("Cannot save empty notes!"); // Prevent empty saves
        return;
    }
    localStorage.setItem("notes", notes);
    alert("Notes saved successfully! ✅");
});
// Load notes manually from localStorage
loadBtn.addEventListener("click", () => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        noteArea.value = savedNotes;
    } else {
        alert("No saved notes found!");
    }
});
// Clear notes from localStorage
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("notes");
    noteArea.value = ""; // Clear textarea
    alert("Notes cleared successfully! ❌");
});
