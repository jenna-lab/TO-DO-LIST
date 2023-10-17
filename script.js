const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");

const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
// const date = document.getElementById("date");
let todoArray = [];

//add listener to button
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //check if inputs are empty
  if (title.value === "") {
    alert("Title is required");
    return;
  }

  if (description.value === "") {
    alert("Description is required");
    return;
  }

  // if (date.value === "") {
  //   alert("Date is required");
  //   return;
  // }

  //push an object with these keys
  todoArray.push({
    title: title.value,
    description: description.value,
    // date: date.value,
    completed: false,
  });
  form.reset();
  addHtml(todoArray);
  console.log(todoArray);

    // Alert when a todo is added
  const message = document.createElement("div");
  message.textContent = "Todo added successfully!";
  message.style.backgroundColor = "#4CAF50";
  message.style.color = "white";
  message.style.padding = "10px";
  message.style.position = "fixed";
  message.style.bottom = "30px";
  message.style.right = "30px";
  message.style.borderRadius = "5px";
  message.style.zIndex = "1";
  message.style.fontSize = "16px";

  document.body.appendChild(message);

  // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(message);
  }, 3000);

});

//PAINT html to the DOM
const paintHtmlToDom = (data, id) => {
  const html = data
    .map((item, index) => {
      //html template
      let htmlCode = `
          <div class="todo-items">
          <ul style="list-style: none;">
              <li id="taskDone">
                  <span  id="checkmark" style="padding-right: 10px;">
                    <input ${
                      data.completed ? "checked" : ""
                    } onchange="completeTask(this, ${index})" type="checkbox" />
                  </span>
                  <span style="padding-right: 10px;" id="titleText">${
                    item.title
                  }</span>
                  <span id="descriptionText">${item.description}</span>
                  <span id="editBtn" style="padding-left: 10px;">
                  <button id="editBtn" onclick="editTask(${index})" type="submit" class="btn">Edit</button>
                  </span><span><button onclick="deleteTask(${index})" id="deleteBtn" type="submit" class="btn delete">Delete </button>
                  </span>
              </li>
          </ul>
      </div>
      `;
      return htmlCode;
    })
    .join("");

//access parent with  Id
  const parentDiv = document.getElementById(id);

  if (parentDiv) {
    parentDiv.innerHTML = html;
  }
};

//display todos to DOM
function addHtml() {
  const completedTodos = todoArray.filter((todo) => todo.completed);
  const notCompletedTodos = todoArray.filter((todo) => !todo.completed);

  paintHtmlToDom(notCompletedTodos, "tasksList");
  paintHtmlToDom(completedTodos, "completedTodos");
}

//EDIT A TASK
function editTask(id) {
  const item = getTaskById(id);

  console.log({ item });

  title.value = item.title;
  description.value = item.description;
  // date.value = item.date;

  addBtn.style.display = "none";
  editBtn.style.display = "block";

  const clickHandler = (event) => {
    event.preventDefault();
    updateTask(id, {
      title: title.value,
      description: description.value,
      // date: date.value,
    });
    editBtn.removeEventListener("click", clickHandler)
    addHtml();
  };
  editBtn.addEventListener("click", clickHandler);
}

//DELETE A TASK
function deleteTask(id) {
  const item = getTaskById(id);

  todoArray.splice(item, 1);
  console.log(todoArray);
  addHtml();
}


//MARK a task complete
function completeTask(target, id) {
  console.log(id);
  const item = getTaskById(id);
  console.log(item);
  taskDone = document.getElementById("taskDone");

  item.completed = target.checked;

  todoArray.splice(id, 1, item);
  addHtml();
}


//UPDATE A TASK
function updateTask(id, newt) {
  todoArray.splice(id, 1, newt);

  addHtml();
  form.reset();
  editBtn.style.display = "none";
  addBtn.style.display = "block";
}

//GET A TASK BY id
function getTaskById(id) {
  return todoArray.find((element, index) => index === id);
}