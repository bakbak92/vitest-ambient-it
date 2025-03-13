import { getStudent, listStudents } from '../scripts/student'
import { describe, test, expect } from 'vitest'

describe('Test student functions', () => {
    test('should return a student object', () => {
        const student = getStudent('John', 15, 7)
        expect(student).toEqual({
            name: 'John',
            age: 15,
            grade: 7,
        })
    })

    test('should return a list of students', () => {
        const students = listStudents
        expect(students).toEqual([
            { name: 'John', age: 15, grade: 7 },
            { name: 'Jane', age: 16, grade: 8 },
            { name: 'Jim', age: 17, grade: 9 },
        ])
    })

    test('should be length 3', () => {
        const students = listStudents
        expect(students).not.toHaveLength(5)
    })

    test('should be don\'t contain Bakary', () => {
        const namestudents = listStudents.map(student => student.name)
        expect(namestudents).not.toContain('Bakary')
    })
    
})
