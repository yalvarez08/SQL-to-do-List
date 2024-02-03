console.log('JS is sourced!');
getTodos()

function getTodos() {
    console.log('executing getTodos');
//axios call to get todos from server
    axios.get('/todos').then((response) => {
        console.log('response', response.data);
        refreshTodosDom();
    })
    .catch((err) => {
        console.log('error in GET', err);
    });
}


function refreshTodosDom() {
    let domData = document.getElementById('todo_item_list');
    domData.innerHTML = "";
    for (let item of domData) {
        const {
            id,
            text,
            isComplete,
        } = item;
        
        domData.innerHTML += `
        <tr>
            <td>${text}</td>
            <td><button onclick="itemCompleted(${id})">Complete</button></td>
            <td><button onclick="itemDeleted(${id})">Delete</button></td>
        </tr>
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