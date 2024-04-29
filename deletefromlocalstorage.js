export default function deletefromlocalstorage(index) {
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'))
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log(todos)
}