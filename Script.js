let tasks = [];
let filter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const showAllBtn = document.getElementById("showAllBtn");
const showActiveBtn = document.getElementById("showActiveBtn");
const showDoneBtn = document.getElementById("showDoneBtn");

const taskList = document.getElementById("taskList");

const counter = document.getElementById("counter");
const clearDoneBtn = document.getElementById("clearDoneBtn");


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}


function render() {
    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "done") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    taskList.innerHTML = filteredTasks.map(task => `
        <li>
            <span>
                ${task.completed ? "✅" : "⬜"} ${task.text}
            </span>

            <button onclick="toggleTask(${task.id})">
                ${task.completed ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        </li>
    `).join("");

    const activeTasks = tasks.filter(task => !task.completed).length;

    counter.textContent = `${activeTasks} active / ${tasks.length} total`;

    saveTasks();
}


function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    render();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}


function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    render();
}


function clearDone() {
    tasks = tasks.filter(task => !task.completed);
    render();
}


showAllBtn.addEventListener("click", () => {
    filter = "all";
    render();
});


showActiveBtn.addEventListener("click", () => {
    filter = "active";
    render();
});


showDoneBtn.addEventListener("click", () => {
    filter = "done";
    render();
});


addBtn.addEventListener("click", addTask);

clearDoneBtn.addEventListener("click", clearDone);


taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});


loadTasks();
render();
