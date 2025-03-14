import axios from 'axios'

let todos = []
async function fetchTodos() {
    const response = await axios.get('http://localhost:3000/todos')
    return response.data
}

function renderTodos(todos) {
    const todosListHtml = todos.map(todo => `<li id="${todo.id}">${todo.title}</li>`).join('')
    return todosListHtml
}

async function postTodo(title) {
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({ title, completed: false })
    })
    return response.json()
}

function addTodo(title, container) {
    todos.push({ id: todos.length + 1, title, completed: false })
    const todoItem = document.createElement('li')
    todoItem.textContent = title
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
    ul.classList.add('list-none', 'flex', 'flex-col', 'gap-2')
    ul.innerHTML = renderTodos(todos)
    containerTodoList.appendChild(ul)

    // ✅ Attacher les événements au formulaire
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const title = input.value.trim()
        if (!title) return

        const newTodo = await postTodo(title)
        if (newTodo) {
            addTodo(newTodo.title, ul) // Ajoute dynamiquement le todo dans la liste
            input.value = '' // Réinitialise l'input
        }
    })

    // ✅ Retourner le container prêt à être testé
    return containerTodoList
}



export { fetchTodos, renderTodos, renderContainerTodo, addTodo, postTodo }