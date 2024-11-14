const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

const renderTasks = () => {
    const tasks = getTasks().sort((a, b) => a.completed - b.completed);
    taskList.innerHTML = "";
    tasks.forEach((task, index) => createTaskElement(task, index));
};

const createTaskElement = (task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item flex justify-between items-center border-b p-2 animate__animated animate__fadeIn ${
      task.priority === "high" ? "bg-red-100" :
      task.priority === "medium" ? "bg-yellow-100" : "bg-green-100"
    }`;

const taskText = document.createElement("span");
taskText.textContent = task.text;
taskText.className = task.completed ? "line-through text-gray-500" : "text-gray-800";

const completeBtn = document.createElement("button");
completeBtn.innerHTML = task.completed ? '<i class="fa-solid fa-rotate-left"></i>' : '<i class="fa-solid fa-check"></i>';
completeBtn.className = "complete-btn text-green-500 hover:text-green-600 px-2";
completeBtn.onclick = () => toggleComplete(index);

const editBtn = document.createElement("button");
editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
editBtn.className = "edit-btn text-yellow-500 hover:text-yellow-600 px-2";
editBtn.onclick = () => editTask(index);

const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
deleteBtn.className = "delete-btn text-red-500 hover:text-red-600 px-2";
deleteBtn.onclick = () => deleteTask(index);

taskItem.append(taskText, completeBtn, editBtn, deleteBtn);
taskList.appendChild(taskItem);
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!taskText) return alert("Por favor, adicione uma tarefa!");
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false, priority });
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
};

const toggleComplete = (index) => {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
};

const editTask = (index) => {
    const tasks = getTasks();
    const taskItem = document.querySelectorAll("#taskList li")[index];
    const taskText = taskItem.querySelector("span");
    const editBtn = taskItem.querySelector(".edit-btn");
  
    if (taskText.isContentEditable) {
      tasks[index].text = taskText.textContent.trim();
      saveTasks(tasks);
      renderTasks();
    } else {
      taskText.contentEditable = true;
      taskText.classList.add("border", "border-gray-300", "p-1", "bg-yellow-50");
  
      editBtn.innerHTML = '<i class="fa-solid fa-save"></i>';
      editBtn.classList.remove("text-yellow-500");
      editBtn.classList.add("text-blue-500");
      
      taskText.focus();
    }
};

const deleteTask = (index) => {
  const tasks = getTasks();
  const taskItems = document.querySelectorAll("#taskList li");
  taskItems[index].classList.add("animate__animated", "animate__fadeOut");
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }, 500);
};

addTaskBtn.onclick = addTask;
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
document.addEventListener("DOMContentLoaded", renderTasks);

const themeToggleBtn = document.getElementById("themeToggleBtn");
let darkMode = localStorage.getItem("darkMode") === "true";

const applyTheme = () => {
  document.body.className = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800";
  themeToggleBtn.textContent = darkMode ? "Tema Claro" : "Tema Escuro";
};

themeToggleBtn.onclick = () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", darkMode);
  applyTheme();
};

applyTheme();