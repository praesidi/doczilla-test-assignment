import { IStudent } from '../App';

function StudentList({ students }: { students: IStudent[] }) {
  return (
    <div className='students-list'>
      {students.length === 0 ? (
        <h2>Список пуст</h2>
      ) : (
        students.map((student) => <div>{student.firstName}</div>)
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
      <span>{student.birthday}</span>
    </div>
  );
}

export default StudentList;
