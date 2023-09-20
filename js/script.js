let count = 0;
let countEl = document.getElementById("todo-count");
let taskAddBtn = document.getElementById("todo-add-btn");
let addTaskModal = document.getElementById("modal");
let modalCloseBtn = document.getElementById("close-button");
let taskTitle = document.getElementById("task-title");
let taskDescription = document.getElementById("task-description");



// open modal function
let modalOpen = () => {
  addTaskModal.style.display = "block";
};

// close modal function
let modalClose = () => {
  addTaskModal.style.display = "none";
};

// dummy data
let data = [
  {
    id: "1",
    title: "task1",
    description: "dummy task 1",
    state: "todo",
  },
  {
    id: "2",
    title: "task2",
    description: "dummy task 2",
    state: "todo",
  },

  {
    id: "3",
    title: "task3",
    description: "dummy task 3",
    state: "todo",
  },
  {
    id: "4",
    title: "task4",
    description: "dummy task 4",
    state: "todo",
  },
];
// const data = [];
const taskData = [];

const btn = document.getElementById("modal-confirm");

const submitForm = () => {
  const _title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const obj = {
    title: _title.value,
    description: desc.value,
  };
  taskData.push(obj);
  console.log(taskData,"taskData")
  const targetDiv = document.getElementById("dynamicDiv");

  for (let i = 0; i < taskData.length; i++) {
    // subchild
    const newElement = document.createElement("div");
    newElement.classList.add("todo-task");
    // child
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftDiv");

    const icon = document.createElement("i");
    const threeDot = document.createElement("i");

    icon.classList.add("task-icon", "fa", "fa-circle-info", "fa-xl");
    threeDot.classList.add("task-crud", "fa", "fa-ellipsis-vertical", "fa-xl");

    const accessDiv = document.createElement("div");
    accessDiv.classList.add("access-div");
    

    leftDiv.append(icon, threeDot);

    const setTitle = document.createElement("p");
    setTitle.append(`${taskData[i].title}`);
    newElement.append(setTitle, leftDiv);
    targetDiv.append(newElement);
  }
  count++;
  // set the count value
countEl.textContent = `${count}`;
  _title.value = "";
  desc.value = "";
  modalClose();
};
