import { describe, test, expect } from 'vitest'

const names = []
let counter = 0

beforeAll(() => {
   names.push('John', 'Jane', 'Jim')
   console.log('beforeAll 1')
})

beforeEach(() => {

    counter++
})

afterEach(() => {
    counter = 0
})

describe('test counter', () => {
    test('if counter is 1', () => {
        expect(counter).toBe(1)
    })

    test('if counter is 1', () => {
        expect(counter).toBe(1)
    })

    test('if counter is 1', () => {
        expect(counter).toBe(1)
    })
})

