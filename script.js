const form = document.getElementById('form');
const listInput = document.getElementById('task-input');

// const addHome = document.getElementById('show-input');

const addTask = document.getElementById('add-button');
const taskList = document.getElementById('taskList');

let toDoList = JSON.parse(localStorage.getItem('todolist')) || [];

let EditTodoId = -1;

form.addEventListener('submit',  () => {
    event.preventDefault();//stop browser from refreshing
    
    addToList();
    pushToUi();
    resetUserInput();

    localStorage.setItem('todolist', JSON.stringify(toDoList));
})

const resetUserInput = () => listInput.value = ""//clears input box
console.log('text')
function addToList(){
    const taskValue = listInput.value;
    const date = new Date().toJSON().slice(0, 10);

    //object for tasks array
    const task = {
        description : taskValue,
        date : date,
        // id: toDoList.length +11
    }

    const isEmpty = taskValue === '';

    // check for duplicate todos
    const isDuplicate = toDoList.some((todo) => todo.description.toUpperCase() === taskValue.toUpperCase());

    if (isEmpty) {
    alert("Todo's input is empty");
    } else if (isDuplicate) {
    alert('Todo already exists!');
    }else{
        if(EditTodoId >= 0) {
            toDoList = toDoList.map((todo, index) => ({
                    ...todo,
                    description: index === EditTodoId ? taskValue : todo.description,
            }));
            EditTodoId = -1;
        } else {
            toDoList.push(task);//update the array
        }
    }
    console.log(toDoList);
}

function pushToUi(){
    
    if (toDoList.length === null) {
        localStorage.setItem('todolist', JSON.stringify(toDoList));
        console.log("enter enter")
        console.log(toDoList.length);
        taskList.innerHTML = '<h1>Nothing to do!</h1>';
        return;
    }
  
    taskList.innerHTML = ""//re-render

    //render todos
    toDoList.forEach((todo, index) => {
        taskList.innerHTML += `
        <div class="list-cards" id=${index}>
            <button id="edit-button" data-action="edit">edit</button>
            <button id="delete-button" data-action="delete">delete</button>
            <h2>${todo.description}</h2>
        </div>
        `//override the html todo list elemeent
    })
}

//target a todo item
taskList.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if (parentElement.className !== 'list-cards') return false;

    const todoItem = parentElement;
    const todoItemID = Number(todoItem.id);

    //target action
    const action = target.dataset.action;

    action === 'edit' && editTodo(todoItemID);
    action === 'delete' && deleteTodo(todoItemID);

    // console.log(todoItemID, action);
})

// update ToDo list

//edit task
function editTodo(todoItemID) {
    listInput.value = toDoList[todoItemID].description;
    EditTodoId = todoItemID;
}

//delete task
function deleteTodo(todoItemID) {
    toDoList = toDoList.filter((todo, index) => index !== todoItemID);
    EditTodoId = -1;

    // re-render
    pushToUi();
    localStorage.setItem('todolist', JSON.stringify(toDoList));
}

//display input box
const showHome = document.getElementById('box');
const addButton= document.getElementById('show-input');

addButton.addEventListener('click', () => {
    showHome.classList.remove('hidden')
    addButton.classList.add('hidden')
    taskList.classList.remove('hidden')

    localStorage.setItem('todolist', JSON.stringify(toDoList));
})
