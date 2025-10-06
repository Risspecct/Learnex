const StudentTable = ({ students }) => {
  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>English</th>
            <th>Science</th>
            <th>Social</th>
            <th>Odia</th>
            <th>Hindi</th>
            <th>Mathematics</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td className={student.scores.english < 40 ? 'low-score' : ''}>{student.scores.english}</td>
              <td className={student.scores.science < 40 ? 'low-score' : ''}>{student.scores.science}</td>
              <td className={student.scores.social < 40 ? 'low-score' : ''}>{student.scores.social}</td>
              <td className={student.scores.odia < 40 ? 'low-score' : ''}>{student.scores.odia}</td>
              <td className={student.scores.hindi < 40 ? 'low-score' : ''}>{student.scores.hindi}</td>
              <td className={student.scores.mathematics < 40 ? 'low-score' : ''}>{student.scores.mathematics}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;