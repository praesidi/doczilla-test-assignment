import { IOperation, IStudent } from '../App';
import AddStudentForm from './AddStudentForm';
import DeleteStudentForm from './DeleteStudentForm';
import StudentList from './StudentList';

function Content({
  operation,
  data,
  onClose,
}: {
  operation: IOperation;
  data: IStudent[];
  onClose: () => void;
}) {
  return (
    <div className='content-container'>
      <div className='content-close-btn-wrapper'>
        <button onClick={onClose}>x</button>
      </div>
      <div className='content-form-wrapper'>
        {operation === 'add' ? <AddStudentForm /> : <></>}
        {operation === 'delete' ? <DeleteStudentForm /> : <></>}
        {operation === 'show all' ? <StudentList students={data} /> : <></>}
      </div>
    </div>
  );
}

export default Content;
