import { IStudent } from '../types';

function StudentList({ students }: { students: IStudent[] }) {
  return (
    <div className='students-list'>
      {students.length === 0 ? (
        <h2>Список пуст</h2>
      ) : (
        students.map((student, index) => (
          <StudentCard key={student.id} student={student} index={index} />
        ))
      )}
    </div>
  );
}

function StudentCard({ student, index }: { student: IStudent; index: number }) {
  return (
    <div className='student-card'>
      <span>{index + 1}</span>
      <span className='name'>{student.firstName}</span>
      <span className='name'>{student.lastName}</span>
      <span className='name'>{student.fatherName}</span>
      <span>{student.group}</span>
      <span>{new Date(student.birthday).toLocaleDateString()}</span>
      <span className='student-id'>{`student id: ${student.id}`}</span>
    </div>
  );
}

export default StudentList;
