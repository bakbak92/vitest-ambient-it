import { vi, describe, it, expect } from 'vitest'
import { getStudents, getGrade, fetchStudents } from '../app/student'
import axios from 'axios'

const axiosSpy = vi.spyOn(axios, 'get')

const students = [
    { name: 'John', age: 20, email: 'john@example.com', grade: 8 },
    { name: 'Jane', age: 21, email: 'jane@example.com', grade: 4 },
    { name: 'Jim', age: 22, email: 'jim@example.com', grade: 10 },
    { name: 'Bakary', age: 23, email: 'bakary@example.com', grade: 7 },
]


describe('test fetchStudents', () => {
    it('should return the students', async() => {
        axiosSpy.mockImplementation((url) => {
            if(url === 'data/students.json') {
                return Promise.resolve({ data: students })
            }
            return Promise.reject(new Error('Error'))
        })

        await axios.get('data/students.json')
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: [
                { name: 'John', age: 20, email: 'john@example.com', grade: 8 },
            ] })
        }).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: [
                { name: 'Sarah', age: 21, email: 'sarah@example.com', grade: 4 },
            ] })
        })
        .mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Error'
                }
            }
        })


        const result = await fetchStudents()
        expect(result).toEqual([{ name: 'John', age: 20, email: 'john@example.com', grade: 8 }])
        expect(fetchSpy).toHaveBeenCalledWith('data/students.json')

        const result2 = await fetchStudents()
        expect(result2).toEqual([{ name: 'Sarah', age: 21, email: 'sarah@example.com', grade: 4 }])
        try {
            await fetchStudents()
        } catch (error) {
            expect(error.response.data.message).toBe('Error')
        }
    })

    it('the error should be displayed a message', async() => {

        axiosSpy.mockRejectedValue({
            response: {
                data: {
                    message: 'Error'
                }
            }
        })
        try {
            await axios.get('data/students.json')
        } catch (error) {
            expect(error.response.data.message).toBe('Error')
        }
        
    })
})

describe('test dom', () => {
    it('should create a div', () => {
        const div = document.createElement('div')
        div.innerHTML = 'Hello World'
        div.classList.add('text-red-500')
        document.body.appendChild(div)
        expect(div.innerHTML).toBe('Hello World')
        expect(div.classList.contains('text-red-500')).toBe(true)
    })

    it('should be red', () => {
        const div = document.createElement('div')
        div.innerHTML = 'Hello World'
        div.classList.add('text-red-500')
        document.body.appendChild(div)
        expect(div.classList).toContain('text-red-500')
    })

    it('should be contain john', () => {
        const div = document.createElement('div')
        div.innerHTML = getStudents([{ name: 'John', age: 20, grade: 5, email: 'john@example.com' }])
        document.body.appendChild(div)
        expect(div.innerHTML).toContain('John')
    })

    it('if the student has a grade less than 2, it should not be displayed', () => {
        const div = document.createElement('div')
        div.innerHTML = getStudents([{ name: 'John', age: 20, grade: 1, email: 'john@example.com' }])
        document.body.appendChild(div)
        expect(div.innerHTML).not.toContain('John')
    })
})

describe('getGrade', () => {
    it('should return badge-success', () => {
        expect(getGrade(8)).toBe('badge-success')
    })

    it('should return badge-warning', () => {
        expect(getGrade(6)).toBe('badge-warning')
    })

    it('should return badge-error', () => {
        expect(getGrade(4)).toBe('badge-error')
    })

    it('check if the student has a badge success', () => {
        const student = { name: 'John', age: 20, email: 'john@example.com', grade: 9 }
        const div = document.createElement('div')
        div.innerHTML = getStudents([student])
        document.body.appendChild(div)
        expect(div.innerHTML).toContain('badge-success')
    })

    it('check if the student has a badge warning', () => {
        const student = { name: 'John', age: 20, email: 'john@example.com', grade: 6 }
        const div = document.createElement('div')
        div.innerHTML = getStudents([student])
        document.body.appendChild(div)
        expect(div.innerHTML).toContain('badge-warning')
    })

    it('check if the grade is displayed', () => {
        const student = { name: 'John5', age: 20, email: 'john@example.com', grade: 5 }
        const div = document.createElement('div')
        div.innerHTML = getStudents([student])
        document.body.appendChild(div)
        const badge = div.querySelector('.badge')

        expect(badge.innerHTML).toContain('5')
    })
})
