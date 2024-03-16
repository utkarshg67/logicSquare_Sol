function generateStudentMarkSheets(students, Details) {
  const studentsMarkSheets = [];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const studentDetails = Details.find((detail) => detail.Roll === student.Roll);

    let totalMarks = 0;

    for (const subject in studentDetails.subjects) {
      totalMarks += studentDetails.subjects[subject];
    }

    const status = totalMarks >= 200 ? "pass" : "fail";

    const markSheet = {
      name: student.name,
      Roll: student.Roll,
      ...studentDetails.subjects,
      total: totalMarks,
      status: status,
    };

    studentsMarkSheets.push(markSheet);
  }

  return studentsMarkSheets;
}

// Input data
const students = [
  { name: "Dhishan Debnath", Roll: 1 },
  { name: "Animesh Gupta", Roll: 2 },
  { name: "Tapas Sen", Roll: 3 },
  { name: "Misti Dutta", Roll: 4 },
  { name: "Chini Misra", Roll: 5 },
];
const Details = [
  { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
  { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
  { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
  { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
  { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } },
];

// Generate student mark sheets
const studentsMarkSheets = generateStudentMarkSheets(students, Details);
console.log(studentsMarkSheets);
