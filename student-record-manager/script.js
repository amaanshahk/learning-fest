const students = [
    { name: "Amaan Shah K", muid: "amaanshahk@mulearn", course: "BCA", marks: 85 },
    { name: "Rahul", muid: "rahul@mulearn", course: "BCA", marks: 78 },
    { name: "Anu", muid: "anu@mulearn", course: "BSc", marks: 91 },
    { name: "Arjun", muid: "arjun@mulearn", course: "BCom", marks: 74 },
    { name: "Meera", muid: "meera@mulearn", course: "BSc", marks: 88 }
];

const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search");
const courseFilter = document.getElementById("course-filter");
const marksFilter = document.getElementById("marks-filter");
const sortSelect = document.getElementById("sort");
const totalStudents = document.getElementById("total-students");
const averageMarks = document.getElementById("average-marks");
const topper = document.getElementById("topper");

function displayStudents(data) {
    studentList.innerHTML = "";
    if (data.length === 0) {
    studentList.innerHTML = "<p>No students found.</p>";
    updateStats(data);
    return;
}
    data.forEach(student => {
        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>μID: ${student.muid}</p>
            <p>Course: ${student.course}</p>
            <p>Marks: ${student.marks}</p>
        `;

        studentList.appendChild(card);
    });

    updateStats(data);
}

function updateStats(data) {
    totalStudents.textContent = data.length;

    if (data.length === 0) {
        averageMarks.textContent = "0";
        topper.textContent = "-";
        return;
    }

    const totalMarks = data.reduce((sum, student) => {
        return sum + student.marks;
    }, 0);

    const average = totalMarks / data.length;

    averageMarks.textContent = average.toFixed(2);

    const topStudent = data.reduce((top, student) => {
        return student.marks > top.marks ? student : top;
    });

    topper.textContent = topStudent.name;
}

function updateStudents() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCourse = courseFilter.value;
    const selectedMarks = marksFilter.value;
    const sortBy = sortSelect.value;

    let filteredStudents = students.filter(student => {
        const matchesName = student.name.toLowerCase().includes(searchText);

        const matchesCourse =
            selectedCourse === "all" ||
            student.course === selectedCourse;

        const matchesMarks =
            selectedMarks === "all" ||
            student.marks >= Number(selectedMarks);

        return matchesName && matchesCourse && matchesMarks;
    });

    if (sortBy === "name") {
        filteredStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortBy === "marks") {
        filteredStudents.sort((a, b) =>
            b.marks - a.marks
        );
    }

    displayStudents(filteredStudents);
}

searchInput.addEventListener("input", updateStudents);
courseFilter.addEventListener("change", updateStudents);
marksFilter.addEventListener("change", updateStudents);
sortSelect.addEventListener("change", updateStudents);

const courses = [...new Set(students.map(student => student.course))];

courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseFilter.appendChild(option);
});

displayStudents(students);
