const todoListHtml = document.querySelector('#todo-list');
const todoInputHtml = document.querySelector('#todo-input');

let uusId = 0;
let todoItems = [];

function renderTodos() {
  todoListHtml.innerHTML = '';

  for (let i = 0; i < todoItems.length; i++) {
    let checkedString = '';
    if (todoItems[i].isChecked) {
      checkedString = 'checked'
    }
    todoListHtml.innerHTML += `
      <li>
        <span>${todoItems[i].text}</span>
        <input
          type="checkbox"
          onclick="toggleTodo(${todoItems[i].id})"
          ${checkedString} 
        />
      </li>
    `
  }
}

renderTodos();

function addTodo() {
  if (todoInputHtml.value == '') {
    console.log('input on tühi!');
    return;
  }

  todoItems.push({
    id: uusId,
    isChecked: false,
    text: todoInputHtml.value,
  });

  uusId++;
  renderTodos();
  todoInputHtml.value = '';
}

function toggleTodo(todoId) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == todoId) {
      todoItems[i].isChecked = !todoItems[i].isChecked;
      break;
    }
  }
}

