function getStudent(name: string, age: number, grade: number) {
    return {
        name,
        age,
        grade
    }
}

const listStudents = [
    {
        name: 'John',
        age: 15,
        grade: 7,
    },
    {
        name: 'Jane',
        age: 16,
        grade: 8,
    },
    {
        name: 'Jim',
        age: 17,
        grade: 9,
    }
]





export { getStudent, listStudents }