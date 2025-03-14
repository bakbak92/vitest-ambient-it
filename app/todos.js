import axios from 'axios'

let todos = []
async function fetchTodos() {
    const response = await axios.get('http://localhost:3000/todos')
    return response.data
}
async function deleteTodo(id) {
    const response = await axios.delete(`http://localhost:3000/todos/${id}`)
    return response.data
}

function removeTodo(id, container) {
    const todoItem = container.querySelector(`li[id="${id}"]`);
    if (todoItem) {
        todoItem.remove();
    }
}

async function updateTodo(id, todo) {
    const response = await axios.put(`http://localhost:3000/todos/${id}`, todo)
    return response.data
}

function toggleTodo(element, todo) {
    if(todo.completed) {
        element.classList.add('line-through')
    } else {
        element.classList.remove('line-through')
    }
}

function buildTodoItem(todo, container) {
    const item = document.createElement('li')
        item.classList.add('flex', 'justify-between', 'items-center')
        item.id = todo.id
        const span = document.createElement('span')
        span.textContent = todo.title
        if(todo.completed) {
            span.classList.add('line-through')
        }
        span.addEventListener('click', async () => {
            todo.completed = !todo.completed
            toggleTodo(span, todo)
            await updateTodo(todo.id, todo)
        })
        item.appendChild(span)
        const button = document.createElement('button')
        button.textContent = 'X'
        button.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded-md')
        button.addEventListener('click', async () => {
            removeTodo(todo.id, container)
            await deleteTodo(todo.id)
        })
        item.appendChild(button)
        return item
}

function renderTodos(todos, container) {
    const items = todos.map(todo => {
        return buildTodoItem(todo, container)
    })

    return items
}

async function postTodo(title) {
    const response = await axios.post('http://localhost:3000/todos', {
        title,
        completed: false
    })
    return response.data
}

function addTodo(newTodo, container) {
    const todoItem = buildTodoItem(newTodo, container)
    container.appendChild(todoItem)
}

async function renderContainerTodo() {
    // Récupérer les todos depuis l'API
    const data = await fetchTodos()
    todos = [...data]

    // Créer un conteneur principal
    const containerTodoList = document.createElement('div')
    containerTodoList.id = 'container-todo'

    // 📝 Formulaire
    const form = document.createElement('form')
    form.id = 'form-todo'
    form.classList.add('flex', 'gap-2', 'mb-4')
    const input = document.createElement('input')
    input.id = 'input-todo'
    input.placeholder = 'Add a todo'
    input.classList.add('border-2', 'border-gray-300', 'rounded-md', 'p-2')

    const button = document.createElement('button')
    button.type = 'submit'
    button.textContent = 'Add'
    button.classList.add('bg-blue-500', 'text-white', 'p-2', 'rounded-md')
    form.appendChild(input)
    form.appendChild(button)
    containerTodoList.appendChild(form)

    // 📋 Liste des todos
    const ul = document.createElement('ul')
    ul.id = 'todos'
    ul.classList.add('list-none', 'flex', 'flex-col', 'gap-5')
    const items = renderTodos(todos, containerTodoList)
    items.forEach(item => ul.appendChild(item))
    containerTodoList.appendChild(ul)



    // ✅ Attacher les événements au formulaire
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const title = input.value.trim()
        if (!title) return

        const newTodo = await postTodo(title)
        if (newTodo) {
            addTodo(newTodo, ul) // Ajoute dynamiquement le todo dans la liste
            input.value = '' // Réinitialise l'input
        }
    })

    // ✅ Retourner le container prêt à être testé
    return containerTodoList
}



export { fetchTodos, renderTodos, renderContainerTodo, addTodo, postTodo, removeTodo, toggleTodo }