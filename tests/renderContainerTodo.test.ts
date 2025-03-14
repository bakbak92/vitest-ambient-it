import { vi,describe, it, expect, beforeEach, } from 'vitest'
import { renderContainerTodo, fetchTodos, postTodo } from '../app/todos'
import { fireEvent, waitFor } from '@testing-library/dom'

import axios from 'axios'


beforeEach(() => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
        data: [
            {
                id: 1,
                title: 'Mon test',
                completed: false
            }
        ]
    })
})

describe('Render Container Todo', () => {
    it('should render the container todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'get')
        axiosSpy.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'aller travailler',
                    completed: false
                },
                {
                    id: 2,
                    title: 'acheter du pain',
                    completed: true
                }
            ]
        })

        const container = await renderContainerTodo()
        expect(container).toBeDefined()
        expect(container.querySelector('form')).toBeDefined()
        expect(container.querySelector('ul')).toBeDefined()
        expect(container.querySelector('li[id="1"]')).toBeDefined()
        expect(container.querySelector('li[id="1"] span')?.textContent).toBe('aller travailler')
        expect(container.querySelector('button')).toBeDefined()
        expect(container.querySelector('input')).toBeDefined()
        
    })

    it.skip('should be able to add a todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'post')
        axiosSpy.mockResolvedValueOnce({
            data: {
                id: 2,
                title: 'Acheter du pain',
                completed: false
            }
        })
        const container = await renderContainerTodo()
        const button: HTMLButtonElement | null = container.querySelector('button')
        if(!button) {
            throw new Error('Button not found')
        }
        const input: HTMLInputElement | null = container.querySelector('input')
        if(!input) {
            throw new Error('Input not found')
        }
        fireEvent.change(input, { target: { value: 'Mon test' } })
        fireEvent.click(button)
        await postTodo('Mon test')
        await vi.waitFor(() => {
            const todoItems = container.querySelectorAll('li')
            expect(todoItems).toHaveLength(2)
            expect(todoItems[1].querySelector('span')?.textContent).toBe('Mon test')
        }, 3000)
    })
    
    it('should be able to delete a todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'delete')
        axiosSpy.mockResolvedValueOnce({
            message: "Todo deleted"
        })
        const container = await renderContainerTodo()
        const button: HTMLButtonElement | null = container.querySelector('li[id="1"] button')
        if(!button) {
            throw new Error('Button not found')
        }
        fireEvent.click(button)
        const itemDeleted = container.querySelector('li[id="1"]')
        expect(itemDeleted).toBeNull()
    })

    it('should be able to toggle a todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'get')
        axiosSpy.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    title: 'aller travailler',
                    completed: false
                },
                {
                    id: 2,
                    title: 'acheter du pain',
                    completed: true
                }
            ]
        })

        vi.spyOn(axios, 'put').mockResolvedValueOnce({
            data: {
                id: 1,
                title: 'aller travailler',
                completed: true
            }
        })
        const container = await renderContainerTodo()
        const itemNotCompleted: HTMLSpanElement | null = container.querySelector('li[id="1"] span')
        const itemCompleted: HTMLSpanElement | null = container.querySelector('li[id="2"] span')
        if(!itemNotCompleted) {
            throw new Error('span not found')
        }
        fireEvent.click(itemNotCompleted)
        const itemToggled = container.querySelector('li[id="1"]')

        expect(itemToggled?.querySelector('span')?.classList.contains('line-through')).toBe(true)
        if(!itemCompleted) {
            throw new Error('span not found')
        }
        fireEvent.click(itemCompleted)
        const itemToggled2 = container.querySelector('li[id="2"]')
        expect(itemToggled2?.querySelector('span')?.classList.contains('line-through')).toBe(false)

    })

})