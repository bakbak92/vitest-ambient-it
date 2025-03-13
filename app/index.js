import { fetchStudents, getStudents } from './student.js'

async function displayStudents() {
    const students = await fetchStudents()
    const studentsDiv = document.getElementById('students')
    studentsDiv.innerHTML = getStudents(students)
}

displayStudents()



