import {
    renderContainerTodo,
} from './todos.js'


const app = document.getElementById('app')

const containerTodo = await renderContainerTodo()
app.appendChild(containerTodo)