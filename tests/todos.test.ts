import { describe, it, expect } from 'vitest'
import { renderTodos, addTodo } from '../app/todos'

const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Buy milk', completed: false },
    { id: 3, title: 'Buy chocolate', completed: false },
]

function createContainer() {
    const container = document.createElement('div')
    document.body.appendChild(container)
    return container
}

describe('Todos', () => {
    it('should render todos list', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos)
        container.innerHTML = todosListHtml
        expect(container.innerHTML).toBe('<li>Buy groceries</li><li>Buy milk</li><li>Buy chocolate</li>')
    })

    it('the first todo should be Buy groceries', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos)
        container.innerHTML = todosListHtml
        const firstTodo = container.querySelector('li')
        expect(firstTodo?.textContent).toBe('Buy groceries')
    })

    it('the list todo should have 3 items', () => {
        const container = createContainer()
        container.innerHTML =  renderTodos(todos)
        const todosList = container.querySelectorAll('li')
        expect(todosList.length).toBe(3)
    })
})