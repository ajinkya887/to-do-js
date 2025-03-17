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
      li.textContent = todoText;
      list.appendChild(li);
    }
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const todoText = input.value.trim();
      if (todoText !== "") {
        todos.push(todoText);
        addTodoToDOM(todoText);
        console.log(todoText);
        saveTodos();
        input.value = '';
      }
    });
  
    loadToDo();
  });
  