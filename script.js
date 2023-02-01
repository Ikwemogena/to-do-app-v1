let toDoList = [];


const form = document.getElementById('form');
const listInput = document.getElementById('task-input');

const addHome = document.getElementById('show-input');

const addTask = document.getElementById('add-button');
const taskList = document.getElementById('taskList');

form.addEventListener('submit',  () => {
    event.preventDefault();//stop browser from refreshing
    
    addToList();
    pushToUi();
    resetUserInput();
})

const resetUserInput = () => listInput.value = ""//clears input box


function addToList(){
    const taskValue = listInput.value;
    let date = new Date().toJSON().slice(0, 10);

    //object for tasks
    const task = {
        description : taskValue,
        date : date
    }

    const isEmpty = taskValue === '';

    if (isEmpty){
        alert("enter something you")
    } else {
        toDoList.push(task);
    }

    // isEmpty?alert("todoisempty"):"e dey work"

    //update the array
    

    console.log(toDoList);
}

console.log("enter")
function pushToUi(){
    if (toDoList.length === null) {
        console.log(toDoList.length);
        taskList.innerHTML = '<h1>Nothing to do!</h1>';
        return;
    }

      
    taskList.innerHTML = ""//default for each render to ui
    toDoList.forEach((todo, index) => {
        taskList.innerHTML += `
        <div class="list-cards" id=${index}>
            <h2>${todo.description}</h2>
        </div>
        `//override the html todo list elemeent
    })
}

//
taskList.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target);
})



//update ToDo list

``