import { describe, it, expect } from 'vitest'
import { renderTodos, addTodo, removeTodo } from '../app/todos'

const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Buy milk', completed: true },
    { id: 3, title: 'Buy chocolate', completed: false },
]

function createContainer() {
    const container = document.createElement('div')
    document.body.appendChild(container)
    return container
}

function buildTodoList(items:HTMLElement[]) {
    const ul = document.createElement('ul')
    items.forEach(item => ul.appendChild(item))
    return ul
}



describe('List Todos', () => {
    it('the first todo should be Buy groceries', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos, container)

        container.appendChild(buildTodoList(todosListHtml))
        const firstTodo = container.querySelector('li span')
        expect(firstTodo?.textContent).toBe('Buy groceries')
    })

    it('the list todo should have 3 items', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos, container)
        container.appendChild(buildTodoList(todosListHtml))
        const todosList = container.querySelectorAll('li')
        expect(todosList.length).toBe(3)
    })

    it('the second todo should be Buy milk and should be marked as done', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos, container)
        container.appendChild(buildTodoList(todosListHtml))
        const secondTodo = container.querySelector('li[id="2"] span')
        expect(secondTodo?.textContent).toBe('Buy milk')
        expect(secondTodo?.classList.contains('line-through')).toBe(true)
    })

    it('the third todo should be Buy chocolate and should not be marked as done', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos, container)
        container.appendChild(buildTodoList(todosListHtml))
        const thirdTodo = container.querySelector('li[id="3"] span')
        expect(thirdTodo?.textContent).toBe('Buy chocolate')
        expect(thirdTodo?.classList.contains('line-through')).toBe(false)
    })
})

describe('Add Todo', () => {
    it('should add a todo', () => {
        const container = createContainer()
        addTodo({
            id: 4,
            title: 'Buy bread',
            completed: false
        }, container)
        let todosList = container.querySelectorAll('li')
        expect(todosList.length).toBe(1)
        addTodo({
            id: 5,
            title: 'Buy bread',
            completed: false
        }, container)
        todosList = container.querySelectorAll('li')
        expect(todosList.length).toBe(2)
    })
})

describe('Delete Todo', () => {
    it('if we delete the task with id 1, the task should be removed', () => {
        const container = createContainer()
        const todosListHtml = renderTodos(todos, container)
        container.appendChild(buildTodoList(todosListHtml))
        const todoItem = container.querySelector('li[id="1"]')
        expect(todoItem).toBeDefined()
        removeTodo(1, container)
        const todoRemoved = container.querySelector('li[id="1"]')
        expect(todoRemoved).toBeFalsy()
    })
})

describe('Toggle Todo', () => {
    it('if we toggle the task with id 1, the task should be marked as done', () => {
        const container = createContainer()
    })

    it('if we toggle the task with id 1, the task should be marked as done', () => {
        const container = createContainer()
    })
})
