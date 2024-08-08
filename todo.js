document.addEventListener('DOMContentLoaded', function() {
  let todoItemsContainer = document.getElementById("todoItemsContainer");
  let addTodoButton = document.getElementById("addTodoButton");
  let saveTodoButton = document.getElementById("saveTodoButton");
  let userInputElement = document.getElementById("todoUserInput");

  function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    return stringifiedTodoList ? JSON.parse(stringifiedTodoList) : [];
  }

  let todoList = getTodoListFromLocalStorage();
  let todosCount = todoList.length;

  saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  function onAddTodo() {
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
      alert("Enter Valid Text");
      return;
    }

    todosCount++;
    let newTodo = {
      text: userInputValue,
      uniqueNo: todosCount,
      isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
  }

  addTodoButton.onclick = function() {
    onAddTodo();
  };

  function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
    if (todoObjectIndex !== -1) {
      todoList[todoObjectIndex].isChecked = checkboxElement.checked;
    }
  }

  function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    todoList = todoList.filter(todo => "todo" + todo.uniqueNo !== todoId);
  }

  function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function () {
      onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
      labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function () {
      onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
  }

  todoList.forEach(todo => createAndAppendTodo(todo));
});
