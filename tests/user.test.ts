import { getUser, listUsers } from '../scripts/user'
import { describe, it, expect } from 'vitest'

describe('Test user functions', () => {
    it('should return a user object', () => {
        const user = getUser('John', 20, 'john@example.com')
        expect(user).toEqual({
            name: 'John',
            age: 20,
            email: 'john@example.com'
        })
    })

    it('should have a name, age, email property', () => {
        const user = getUser('John', 20, 'john@example.com')
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('age')
        expect(user).toHaveProperty('email')
    })

    it('should have a age property', () => {
        const users = listUsers
        expect(users).toHaveLength(4)
    })

    it('should be contain all users', () => {
        const users = listUsers
        expect(users).toEqual([
            { name: 'John', age: 20, email: 'john@example.com' },
            { name: 'Jane', age: 21, email: 'jane@example.com' },
            { name: 'Jim', age: 22, email: 'jim@example.com' },
            { name: 'Bakary', age: 23, email: 'bakary@example.com' },
        ])
    })
})