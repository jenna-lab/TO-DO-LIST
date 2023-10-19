let todos = [];

function renderTodos() {
  const tasksList = document.getElementById('tasksList');
  const completedTodos = document.getElementById('completedTodos');

  tasksList.innerHTML = '';
  completedTodos.innerHTML = '';

  todos.forEach((todo, index) => {
    const todoItem = `
      <div class="todo-items">
        <div>
          <input type="checkbox" onchange="completeTodo(${index})" ${
      todo.completed ? 'checked' : ''
    } />
        </div>
        <div>${todo.title}</div>
        <div>${todo.description}</div>
        <div>
          ${
            todo.completed
              ? ''
              : `<button class="btn update" onclick="editTodo(${index})">Edit</button>`
          }
          <button class="btn delete" onclick="deleteTodo(${index})">Delete</button>
        </div>
      </div>
    `;

    if (todo.completed) {
      completedTodos.innerHTML += `<div class="completed">${todoItem}</div>`;
    } else {
      tasksList.innerHTML += todoItem;
    }
  });
}

function addTodo() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  if (title && description) {
    todos.push({ title, description, completed: false });
    renderTodos();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  const editBtn = document.getElementById('editBtn');
  const addBtn = document.getElementById('addBtn');

  editBtn.hidden = false;
  addBtn.hidden = true;

  document.getElementById('title').value = todos[index].title;
  document.getElementById('description').value = todos[index].description;

  editBtn.onclick = function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
      todos[index].title = title;
      todos[index].description = description;
      editBtn.hidden = true;
      addBtn.hidden = false;
      renderTodos();
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
    }
  };
}

function completeTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

renderTodos();
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});
