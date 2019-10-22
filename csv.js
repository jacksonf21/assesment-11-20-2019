const { csvGenerate, fileReader, splitter } = require('./helper');
const { marksObjectAssign, objectAssign } = require('./createObjects');
const { reportGenerator } = require('./reportGenerator');

//INPUT EACH FILE NAME AND EXTENSION AFTER '/samples/'
const coursesData = fileReader('./samples/courses.csv');
const marksData = fileReader('./samples/marks.csv');
const studentsData = fileReader('./samples/students.csv');
const testsData = fileReader('./samples/tests.csv');

Promise.all([coursesData, marksData, studentsData, testsData])
  .then(values => processData(values));

const processData = (data) => {
  const c = splitter(data[0]);
  const m = splitter(data[1]);
  const s = splitter(data[2]);
  const t = splitter(data[3]);

  const courses = objectAssign(c);
  const marks = marksObjectAssign(m);
  const students = objectAssign(s);
  const tests = objectAssign(t);

  const allKeys = [c[0], m[0], s[0], t[0]];

  let reports = reportGenerator(courses, marks, students, tests, allKeys);
  reports = reports.reduce((a, b) => a + b);
  
  csvGenerate('report.txt', reports)
    .then(() => {
      console.log('complete')
    });
};
