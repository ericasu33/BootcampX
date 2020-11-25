const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const cohortName = [`%${process.argv[2]}%`];
const queryStr = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

pool.query(queryStr, cohortName)
  .then(res => {
    console.log('connected');
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort} : ${teacher.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));