// import { setLocalArr, getLocalArr } from "./useLocalStorage.js";
// function for local storage
const setLocalArr = (key) => {
  let taskDataStr = JSON.stringify(key);
  localStorage.setItem("todoTask", taskDataStr);
};

const getLocalArr = () => {
  let retString = localStorage.getItem("todoTask");
  return JSON.parse(retString) ?? [];
};

const countEl = document.getElementById("todo-count");
const taskAddBtn = document.getElementById("todo-add-btn");
const addTaskModal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("close-button");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementsByClassName("task-description");

const titleField = document.getElementById("title");
const titleDesc = document.getElementById("desc");
const modalConfirmBtn = document.getElementById("modal-confirm");
const crudEl = document.getElementsByClassName("crud-div");
const infoButtons = document.getElementsByClassName("info-btn");
const crudButton = document.getElementsByClassName("crud-btn");
const deleteButton = document.getElementsByClassName("delete-btn");
const modalTitle = document.getElementById("modal-title");
let editTodoID = "";
// todo Array
let taskData = getLocalArr();

// progress Array
let progressData = [];
// completed Array
let completedData = [];

//focus on title field
function getFocus() {
  titleField.focus();
}

// open modal function
const modalOpen = (value, index) => {
  if (value === "add" && index === null) {
    editTodoID = "";
    modalTitle.textContent = "Create a new task";
    addTaskModal.style.display = "block";
  } else {
    editTodoID = index;
    modalTitle.textContent = "Edit your task";
    addTaskModal.style.display = "block";
    const editTodo = taskData.find((todo) => todo.id === editTodoID);
    console.log(editTodo, "editTodo");
    titleField.value = editTodo.title;
    titleDesc.value = editTodo.description;
  }
  // addTaskModal.style.display = "block";
  getFocus();
};

// close modal function
const modalClose = () => {
  addTaskModal.style.display = "none";
};

// UI Update function
let updatePage = () => {
   taskData = getLocalArr();
  const targetDiv = document.getElementById("dynamicDiv");
  console.log(taskData, "task");

  targetDiv.innerHTML = taskData
    .map(
      (todo, index) =>
        `<div class="todo-task">
        <div class="todo-task-detail">
          <span>${todo.title}</span>
          <div class="todo-btn">
            <button class="info-btn"><i class="fa fa-circle-info fa-xl"></i></button>
            <button class="crud-btn"><i class="fa fa-ellipsis-vertical fa-xl"></i></button>
          <div class="crud-div">
            <div class="edit">
              <button onclick="modalOpen('edit',${todo.id})"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
            </div>
            <div class="delete">
              <button class="delete-btn" onclick="deleteTask(${todo.id}, ${index})"><i class="fa-regular fa-trash-can"></i> Delete</button>  
            </div>
            <div class="progress-shift">
            <button class="progress-shift-btn" onclick="shiftToProgress()">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> To Progress
            </button>
            </div>
          </div>
        </div>
      </div>
  <div class="task-description">${todo.description}</div>
  </div>`
    )
    .join("");
  let count = taskData.length;
  countEl.textContent = `${count}`;

  for (let i = 0; i < infoButtons.length; i++) {
    infoButtons[i].addEventListener("click", function () {
      if (taskDescription[i].style.display === "none") {
        taskDescription[i].style.display = "block";
      } else {
        taskDescription[i].style.display = "none";
      }
    });

    crudButton[i].addEventListener("click", function () {
      if (crudEl[i].style.display === "none") {
        crudEl[i].style.display = "block";
      } else {
        crudEl[i].style.display = "none";
      }
    });
  }
};

// submit function
const submitForm = () => {
  const _title = document.getElementById("title");
  const desc = document.getElementById("desc");
  console.log(editTodoID);
  const obj = {
    id: editTodoID !== "" ? editTodoID : Math.random(),
    title: _title.value,
    description: desc.value,
  };
  if (editTodoID === "") {
    taskData.push(obj);
  } else {
    // let tasks = taskData.filter(todo=>todo.id!==obj.id); // [1, 3]
    // tasks.push(obj); // [1, 3, 2]
    // taskData = tasks;

    // const ind = taskData.findIndex(todo => todo.id === obj.id);
    // taskData.splice(ind, 1, obj);

    let tasks = taskData.map((todo) => (todo.id === obj.id ? obj : todo));
    taskData = tasks;
  }
  setLocalArr(taskData);
  updatePage();
  _title.value = "";
  desc.value = "";
  modalClose();

  // editTodoID=""
};

// delete function
let deleteTask = (id, index) => {
  deleteButton[index].addEventListener("click", function () {
    const deleteTodo = taskData.filter((todo) => todo.id !== id);
    setLocalArr(deleteTodo);
    taskData = getLocalArr();
    updatePage();
  });
};

//delete all tasks
let deleteAll = () => {
  localStorage.removeItem("todoTask");
  updatePage();
};

updatePage();
