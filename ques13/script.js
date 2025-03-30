const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const searchTaskInput = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");
// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);
// Function to generate unique ID
function generateId() {
    return Date.now().toString();
}
// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Task cannot be empty!");
    const task = {
        id: generateId(),
        text: taskText,
        completed: false
    };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = ""; // Clear input
    renderTasks(tasks);
}
// Function to render tasks
function renderTasks(tasks) {
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask('${task.id}')">${task.text}</span>
            <button onclick="removeTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
// Function to load tasks on page refresh
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
}
// Function to toggle task completion
function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}
// Function to remove task
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
}
// Function to search tasks in real-time
searchTaskInput.addEventListener("input", () => {
    const searchText = searchTaskInput.value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText));
    renderTasks(filteredTasks);
});
// Event listener for adding tasks
addTaskButton.addEventListener("click", addTask);
