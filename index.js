document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  let todos = [];

  function loadToDo() {
    const savedToDos = localStorage.getItem("todos");
    if (savedToDos) {
      todos = JSON.parse(savedToDos);
      todos.forEach((todoText) => addTodoToDOM(todoText));
    }
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function addTodoToDOM(todoText) {
    const li = document.createElement("li");
    li.style.marginTop = "10px";
    li.textContent = todoText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";
    editBtn.addEventListener("click", () => editTodo(li, todoText));
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => deleteTodo(li, todoText));
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  function editTodo(li, oldText) {
    const newText = prompt("edit your task: ", oldText);
    if (newText && newText.trim() !== "") {
      const index = todos.indexOf(oldText);
      if (index !== -1) {
        todos[index] = newText.trim();
        saveTodos();
        li.firstChild.textContent = newText.trim();
      }
    }
  }

  function deleteTodo(li, todoText) {
    const confirmDelete = confirm(
      `Are you sure you want to delete: ${todoText}`
    );
    if (confirmDelete) {
      const index = todos.indexOf(todoText);
      if (index !== -1) {
        todos.splice(index, 1);
        saveTodos();
        list.removeChild(li);
      }
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoText = input.value.trim();
    if (!todoText) {
      alert("Please wrie down a task");
    }
    if (todoText !== "") {
      todos.push(todoText);
      addTodoToDOM(todoText);
      console.log(todoText);
      saveTodos();
      input.value = "";
    }
  });

  loadToDo();
});
