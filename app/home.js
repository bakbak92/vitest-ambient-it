function getGrade(grade) {
    if (grade >= 8) {
        return 'badge-success'
    } else if (grade >= 6) {
        return 'badge-warning'
    } else {
        return 'badge-error'
    }
}

async function fetchStudents() {
    const response = await fetch('data/students.json')
    const data = await response.json()
    return data.data
}

function getStudents(students) {
    return students
        .filter(student => student.grade >= 2)
        .map(student => `<div>${student.name} <span class="badge ${getGrade(student.grade)}">${student.grade}</span></div>`).join('')
}


export { getStudents, getGrade, fetchStudents }
