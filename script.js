let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')
let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return;
    let newToDo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newToDo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessage() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function (item, i) {
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
            <span class="icon" onclick="deleteTask(${i})"><img src="./images/trash.png" alt=""></span>
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
}

todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
    // console.log('valueLabel: ', valueLabel);
})

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.keyCode === 13) {
                //
            } else {
                item.important = !item.important;
            }
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("todo");
    todoList = JSON.parse(getLocalStorageData);
    todoList.splice(index, 1);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList))
}