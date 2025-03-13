import { describe, test, expect } from 'vitest'

async function HelloWorld() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 1000)
    })
}

describe('async', () => {
    test('should be Hello World', async () => {
        expect(HelloWorld()).rejects.toThrow('error')
    })
})
