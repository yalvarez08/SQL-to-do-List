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
        <li data-testid="toDoItem" id="list_element" class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
        style="background-color: #f4f6f7;"> ${item.text}
            <button data-testid="completeButton" class="btn btn-outline-success" onclick="itemCompleted(${item.id}, event)">✅</button>
            <button data-testid="deleteButton" class="btn btn-outline-danger ml-2" onclick="itemDeleted(${item.id})">❌</button>
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
    Swal.fire({
        title: "Success!",
        text: "New task was added.",
        width: 600,
        padding: "3em",
        color: "#716add",
        backdrop: `
            rgba(0,0,123,0.4)
            url("images/cheering-penguins.gif")
            left top
            repeat
        `
    });
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
function itemCompleted(id, event) {
    event.target.parentElement.classList.add("completed");
//axios call to put(update) item to completed 
    axios.put(`/todos/${id}`)
    .then((response) => {
        //getTodos();
    })
    .catch((err) => {
        console.log('error in PUT', err);
    });
}
     

//delete todo item from list
function itemDeleted(id) {
//confirmation pop-up when deleting a task
    Swal.fire({
        title:'Are you sure you want to delete this task?',
        showDenyButton:true,
        showCancelButton: true,
        confirmButtonText:'Yes',
        denyButtonText:'No',
    })
//axios call to delete item from database table
    .then((act) => {
        if(act.isConfirmed) {
            axios.delete(`/todos/${id}`)
            .then((result) => {
                getTodos()
            })
            .catch((err) => {
                console.log('error in DELETE', err);
                Swal.fire('Task was successfully deleted!');
            })
        } else if(act.isDenied) {
            Swal.fire('Task was not deleted.')
        }
    });
}