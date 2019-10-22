const reportGenerator = (courses, marks, students, tests, allKeys) => {
  const reports = [];
  const studentCoursesArr = [];
  
  const marksKey = allKeys[1][1];
  const courseNameKey = allKeys[0][1];
  const teacherKey = allKeys[0][2];
  const studentKey = allKeys[1][2];
  const weightKey = allKeys[3][2];
  const courseIDKey = allKeys[3][1];

  //ITERATE THROUGH STUDENT NAMES
  for (student in students) {
    let studentCourses = {};
    
    //DETERMINE EACH COURSE
    for (testID in marks) {
      if (marks[testID][marksKey].hasOwnProperty(student)) {
        let courseID = tests[testID][courseIDKey];

        //GRADE TIMES WEIGHT OF TEST
        const grade = marks[testID][marksKey][student][studentKey] * (tests[testID][weightKey] / 100);
        const weight = Number(tests[testID][weightKey]);

        //IF COURSEID NOT IN STUDENTCOURSES
        if (!studentCourses[courseID]) {
          studentCourses[courseID] = {
            [courseNameKey]: courses[courseID][courseNameKey],
            [teacherKey]: courses[courseID][teacherKey],
            'grade': grade,
            'weight': weight
          }
        } else {
          studentCourses[courseID]['grade'] += grade;
          studentCourses[courseID]['weight'] += weight;
        }       
      }
    }
    //CHECK IF WEIGHT IS 100
    if (studentCourses[tests[testID][courseIDKey]]['weight'] !== 100) {
      throw new Error('Weight is not equal to 100');
    }
    studentCoursesArr.push({[student]: studentCourses});
  }

  //RUN THROUGH EACH STUDENT OBJECT
  studentCoursesArr.forEach(student => {
    const studentId = Object.keys(student);
    let courseStr = '';
    let totalAverage = 0;
    let count = 0;

    for (let course in student[studentId]) {
      totalAverage += student[studentId][course]['grade']; 
      courseStr += `
        Course: ${student[studentId][course][courseNameKey]}, Teacher: ${student[studentId][course][teacherKey]} \n
        Final Grade: ${student[studentId][course]['grade'].toFixed(2)}%
        `;
      count += 1;
    }
    totalAverage = totalAverage / count;

    let reportStr = `
      Student Id: ${studentId}, name: ${students[studentId][courseNameKey]} \n 
      Total Average: \t ${totalAverage.toFixed(2)}%\n
      \n
      \t ${courseStr} 
      `;
    reports.push(reportStr);
  })
  return reports;
};

module.exports = { reportGenerator }