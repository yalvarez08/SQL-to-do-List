console.log('JS is sourced!');
getTodos()

function getTodos() {
    console.log('executing getTodos');
//axios call to get todos from server
    axios.get('/todos').then((response) => {
        console.log('response', response.data);
        refreshTodosDom(response.data);
    })
    .catch((err) => {
        console.log('error in GET', err);
    });
}


function refreshTodosDom(listOfTodos) {
    let domData = document.getElementById('todo_item_list');
    domData.innerHTML = "";
    for (let item of listOfTodos) {
        domData.innerHTML += `
        <li data-testid="toDoItem"> ${item.text}
            <button data-testid="completeButton" onclick="itemCompleted(${item.id})">Complete</button>
            <button data-testid="deleteButton" onclick="itemDeleted(${item.id})">Delete</button>
        </li>
        `;
    }
}

function addTodoItem(event) {
    event.preventDefault();
    console.log('executing addTodoItem');
    
    const taskToSend = {
        text: document.getElementById('todo_item').value
    };
    console.log('Adding todo task:', taskToSend);
    document.getElementById('todo_item').value = "";
//axios call to add todo item to list
    axios({method:'POST', url: '/todos', data: taskToSend})
    .then((response) => {
        getTodos();
    })
    .catch((err) => {
        console.log('error in POST', err);
    });
} 

//update isComplete value to true in database
function itemCompleted(id) {
//axios call to put(update) item to completed 
    axios.put(`/todos/${id}`)
    .then((response) => {
        getTodos();
    })
    .catch((err) => {
        console.log('error in PUT', err);
    });
}

//delete todo item from list
function itemDeleted(id) {
//axios call to delete item from database table
    axios.delete(`/todos/${id}`)
    .then((response) => {
        getTodos();
    })
    .catch((err) => {
        console.log('error in DELETE', err);
    })
}