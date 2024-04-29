import saveTodoLocalstorage from "./saveTodoLocalstorage.js";
import sort from "./sort.js";
import getCurrentDateTimeString from "./getdate.js";
import search from "./search.js";
import editLocal from "./editLocal.js";
import deletefromlocalstorage from "./deletefromlocalstorage.js";
const all = document.querySelector(".all")
const active = document.querySelector(".active")
const complete = document.querySelector(".complette")
const inputTask = document.querySelector(".input-task");
const AddBtn = document.querySelector("#add");
const Todocontainer = document.querySelector(".todos");
const leftTasks = document.querySelector(".leftTasks")
const clearcomplete = document.querySelector(".clearcomplete")
const footer = document.querySelector(".footer");
const edit = document.querySelector(".edit")
const edit_input = document.querySelector(".edit input");
const btn_save = document.querySelector(".edit button");
const gray = document.querySelector(".gray")
const searchBtn = document.querySelector(".searchbtn")
const searchInput = document.querySelector(".searchinput")
const arrTasks = [];
let numberleftTasks = 0;
let numbercompleteTasks = 0;
const radios = document.querySelectorAll(".radio")
document.addEventListener('DOMContentLoaded', returnsavedtodofromLocalstorage)
AddBtn.addEventListener("click", addTask);
clearcomplete.addEventListener("click", clearcompletes);
active.addEventListener('click', () => {
    const incomplete = document.querySelectorAll(".todo");
    incomplete.forEach((incomple) => {
        if (!incomple.classList.contains("complete")) {
            incomple.style.display = 'flex'
        } else {
            incomple.style.display = 'none'
        }
    })
})

all.addEventListener('click', () => {
    const complete = document.querySelectorAll(".todo");
    complete.forEach((comple) => {
        comple.style.display = 'flex'

    })
})
complete.addEventListener('click', () => {
    const incomplete = document.querySelectorAll(".todo");
    incomplete.forEach((incomple) => {
        if (!incomple.classList.contains("complete")) {
            incomple.style.display = 'none'
        } else {
            incomple.style.display = 'flex'
        }
    })
})

function clearcompletes() {
    const complete = document.querySelectorAll(".complete");
    complete.forEach((comple) => {
        comple.remove()
        deletefromlocalstorage(comple);
        if (Todocontainer.children.length == 0) {
            footer.style.display = 'none'
        };
    })
}
function addTask(e) {
    e.preventDefault();

    if (inputTask.value !== "") {
        const taskinfo = {
            state: false,
            id: 0,
            title: inputTask.value,
            taskTime: document.createElement("span"),
            tagEdit: document.createElement("a"),
            editIcon: document.createElement("i"),
            taskParagraph: document.createElement("p")
        }
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type", "checkbox");

        taskinfo.taskParagraph.textContent = taskinfo.title;


        arrTasks.push(taskinfo);


        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash", "btn-trash");
        taskinfo.tagEdit.classList.add("tag");
        taskinfo.tagEdit.appendChild(taskinfo.editIcon);
        taskinfo.editIcon.classList.add("fa-solid", "fa-pen-to-square", "btn-edit")
        // Append elements to todoDiv
        todoDiv.appendChild(checkboxInput);
        todoDiv.appendChild(taskinfo.taskParagraph);
        todoDiv.appendChild(taskinfo.taskTime)
        todoDiv.appendChild(trashIcon);
        todoDiv.appendChild(taskinfo.tagEdit);
        Todocontainer.appendChild(todoDiv);
        numberleftTasks++
        leftTasks.innerHTML = `${numberleftTasks} tasks left`
        footer.style.display = 'flex'
        taskinfo.taskTime.textContent = getCurrentDateTimeString()
        saveTodoLocalstorage(inputTask.value, taskinfo.state, taskinfo.taskTime.textContent);
        inputTask.value = '';
    } else {
        alert("you should write a task ")
    }


}
let taskobj = {};
let target;
let index;

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
        edit.classList.add('show');
        gray.classList.add('g');
        e.target.classList.add("edited");
        target = e.target.parentElement.children[1]
        index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement)
        console.log(index)
    }
    taskobj = {
        tartgetTask: target,
        indexTask: index
    }
});

// Attach click event listener to btn_save
edit_input.addEventListener("change", () => {
    taskobj.tartgetTask.textContent = edit_input.value;
    editLocal(taskobj.indexTask, edit_input.value, 0)
    // saveTodoLocalstorage(edit_input.value)
})
btn_save.addEventListener('click', () => {
    console.log(taskobj.tartgetTask)
    edit.classList.remove('show');
    gray.classList.remove('g');
    edit_input.value = '';
    arrTasks.forEach(task => {
        if (task.tagEdit.classList.contains("edited")) {
            task.id = 0;
            task.tagEdit.classList.remove("edited")
        }
    })
})
Todocontainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-trash")) {
        if (!e.target.parentElement.classList.contains("complete")) {
            numberleftTasks--
        }
        index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement)
        e.target.parentElement.remove();
        deletefromlocalstorage(index)
        leftTasks.innerHTML = `${numberleftTasks} tasks left`
        if (Todocontainer.children.length == 0) {
            footer.style.display = 'none'
        };
    }
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox" && e.target.parentElement.lastElementChild.style.color == "white") {

        e.target.parentElement.lastElementChild.style.color = "black";
        e.target.parentElement.children[3].style.color = "black";
        e.target.parentElement.classList.remove("complete");
        index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement)
        editLocal(index, false, 1)
        numbercompleteTasks--
        numberleftTasks++
        leftTasks.innerHTML = `${numberleftTasks} tasks left`

    } else if (e.target.tagName === "INPUT" && e.target.type === "checkbox" && e.target.parentElement.lastElementChild.style.color !== "white") {

        e.target.parentElement.lastElementChild.style.color = "white";
        e.target.parentElement.children[3].style.color = "white";
        e.target.parentElement.classList.add("complete");
        index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement)
        editLocal(index, true, 1)
        numbercompleteTasks++
        numberleftTasks--
        leftTasks.innerHTML = `${numberleftTasks} tasks left`

    } else {
        console.log("else")
    }
})

function returnsavedtodofromLocalstorage() {
    let todos;


    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'))

    }

    todos.forEach(todo => {
        console.log(todo)
        console.log(numberleftTasks)
        if (todo !== "") {
            const taskinfo = {
                state: todo[1],
                id: 0,
                title: todo[0],
                taskTime: document.createElement("span"),
                tagEdit: document.createElement("a"),
                editIcon: document.createElement("i"),
                taskParagraph: document.createElement("p")
            }
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");


            const checkboxInput = document.createElement("input");
            checkboxInput.setAttribute("type", "checkbox");
            // checkboxInput.parentElement.classList.add("complete");

            taskinfo.taskParagraph.textContent = taskinfo.title;


            arrTasks.push(taskinfo);


            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash", "btn-trash");
            taskinfo.tagEdit.classList.add("tag");
            taskinfo.tagEdit.appendChild(taskinfo.editIcon);
            taskinfo.editIcon.classList.add("fa-solid", "fa-pen-to-square", "btn-edit")
            // Append elements to todoDiv
            todoDiv.appendChild(checkboxInput);
            todoDiv.appendChild(taskinfo.taskParagraph);
            todoDiv.appendChild(taskinfo.taskTime)
            todoDiv.appendChild(trashIcon);
            todoDiv.appendChild(taskinfo.tagEdit);
            Todocontainer.appendChild(todoDiv);
            taskinfo.taskTime.textContent = todo[2]
            console.log(numberleftTasks)
            leftTasks.innerHTML = `${numberleftTasks} tasks left`
            footer.style.display = 'flex'

            if (taskinfo.state == true) {
                todoDiv.lastElementChild.style.color = "white";
                todoDiv.children[3].style.color = "white";
                todoDiv.classList.add('complete')
                todoDiv.children[0].checked = true
            } else {
                console.log(1 + 1)
                todoDiv.lastElementChild.style.color = "black";
                todoDiv.children[3].style.color = "black";
                todoDiv.children[0].checked = false
                numberleftTasks++
                leftTasks.innerHTML = `${numberleftTasks} tasks left`
            }


        } else {
            alert("you should write a task ")
        }
    })
}
searchInput.addEventListener('input', (e) => {
    e.preventDefault()
    document.querySelectorAll(".todo").forEach(todo => {
        todo.style.display = 'flex'

    })
    const arrsSearchtext = []
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        arrsSearchtext.push(todo[0])

    })
    const arrofFilterText = search(arrsSearchtext, searchInput.value);
    console.log(arrofFilterText, arrsSearchtext)
    //that's mean that there is no items in ok with search or opposite
    if (searchInput.value != '') {
        arrofFilterText.forEach(task => {
            document.querySelectorAll(".todo").forEach(todo => {
                if ((todo.children[1].textContent == task)) {
                    todo.style.display = 'none'
                }
            })
        })

    }
})


radios.forEach(radio => {
    radio.addEventListener('click', sortchang)
});
function sortchang() {

    const arrDatetext = [];
    let orderedArr;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        if (this.children[1].textContent == 'Alphapatic') {
            console.log('start alpah')
            arrDatetext.push(todo[0])
            console.log(todo[0]);
        } else {
            arrDatetext.push(todo[2])
        }
    })
    orderedArr = sort(arrDatetext, this.children[1].textContent);
    console.log(orderedArr)
    orderedArr.forEach(order => {
        document.querySelectorAll(".todo").forEach(todo => {
            console.log(order)
            console.log(todo.children[1].textContent)
            if ((todo.children[2].textContent == order) || todo.children[1].textContent == order) {
                console.log('hello world')
                todo.parentElement.appendChild(todo);
            }
        })
    })
}
