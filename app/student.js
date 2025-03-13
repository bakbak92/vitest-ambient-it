function getGrade(grade) {
  if (grade >= 8) {
      return 'badge-success'
  } else if (grade >= 6) {
      return 'badge-warning'
  } else {
      return 'badge-error'
  }
}


function cardStudent(student) {
  const cardHtml = `
    <div class="card bg-base-100 w-96 shadow-sm">
        <div class="card-body flex flex-row justify-between">
            <h2 class="card-title">${student.name}</h2>
            <div>
                <span>Age: ${student.age}</span>
                <span class="badge ${getGrade(student.grade)}">${student.grade}</span>
            </div>
        </div>
    </div>
  `;
  return cardHtml;
}

function getStudents(students) {
  return students
      .filter(student => student.grade >= 2)
      .map(student => cardStudent(student)).join('')
}

async function fetchStudents() {
  const response = await fetch('data/students.json')
  const data = await response.json()
  return data.data
}

export { cardStudent, getGrade, getStudents, fetchStudents }

