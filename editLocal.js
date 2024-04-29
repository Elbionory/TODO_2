export default function editLocal(idx1, value, idx2) {
    let todos;
    todos = JSON.parse(localStorage.getItem('todos'))
    todos[idx1][idx2] = value
    localStorage.setItem('todos', JSON.stringify(todos))
}