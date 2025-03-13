import { add, multiply, divide, subtract } from '../scripts/math'
import { describe, test, expect } from 'vitest'

describe('Test math functions', () => {
  test('1 + 1 shoudl be 2', () => {
    const result = add(1, 1)
    expect(result).toBe(2)
  })

  test('5 * 5 should be 25', () => {
    const result = multiply(5, 5)
    expect(result).toBe(25)
  })

  test('10 / 2 should be 5', () => {
    expect(divide(10, 2)).toBe(5)
  })

  test('20 - 10 should be 10', () => {
    expect(subtract(20, 10)).toBe(10)
  })
})
