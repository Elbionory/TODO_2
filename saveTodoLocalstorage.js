export default function saveTodoLocalStorage(todo, state, timestamp) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
   
    todos.push([todo, state, timestamp]);
    localStorage.setItem('todos', JSON.stringify(todos));
}
