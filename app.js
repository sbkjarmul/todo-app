//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkDelete);
document.addEventListener("DOMContentLoaded", getTodos);
//Functions
function addTodo(event) {
  event.preventDefault();
  //CREATE DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-block");
  //CREATE LI
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `<i class="fas fa-thumbtack"></i> &emsp;${todoInput.value}`;
  todoDiv.appendChild(todoItem);
  //CREATE DELETEBUTTON
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<i class="fas fa-times"></i>';
  todoDiv.appendChild(deleteButton);
  //ADD TO LIST
  todoList.appendChild(todoDiv);
  //SAVE TO THE LOCAL STORE
  //console.log(`input: ${todoInput.value}`);
  saveLocalTodos(todoInput.value);
  //CLEAR TODOINPUT VALUE
  todoInput.value = "";
}

function checkDelete(e) {
  e.preventDefault();
  const item = e.target;

  //DELETE BUTTON

  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    todo.classList.add("disappear");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK ITEM

  if (item.classList[0] === "todo-item") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (todo.classList.contains("completed")) {
      todo.querySelector(".todo-item").style.color = "#4b01ac";
    } else {
      todo.querySelector(".todo-item").style.color = "#a3b1c6";
    }
  }
}

//SAVE LOCAL TODOS
function saveLocalTodos(todo) {
  //CHECK DO I ALREADY HAVE THINGS IN THERE
  let todos;
  //  console.log(`todo: ${todo}`);
  if (localStorage.getItem("todos") === null) {
    todos = [];
    //    console.log("pusta");
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //  console.log(`todos: ${todos}`);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//GET TODOS FROM LOCALSTORAGE

function getTodos() {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-block");
    //CREATE LI
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `<i class="fas fa-thumbtack"></i> &emsp;${todo}`;
    todoDiv.appendChild(todoItem);
    //CREATE DELETEBUTTON
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    todoDiv.appendChild(deleteButton);
    //ADD TO LIST
    todoList.appendChild(todoDiv);
  });
}

//DELETE TODOS FROM LOCALSTORAGE

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos" === null)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
