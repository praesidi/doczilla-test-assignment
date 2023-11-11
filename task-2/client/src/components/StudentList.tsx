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

function StudentCard() {
  return <div></div>;
}

export default StudentList;
