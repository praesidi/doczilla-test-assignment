import { FormEvent } from 'react';
import { IOperation, IStudent } from '../types';
import AddStudentForm from './AddStudentForm';
import DeleteStudentForm from './DeleteStudentForm';
import StudentList from './StudentList';

function Content({
  operation,
  data,
  onClose,
  handleAddStudent,
  handleDeleteStudent,
  handleFormReset,
}: {
  operation: IOperation;
  data: IStudent[];
  onClose: () => void;
  handleAddStudent: (e: FormEvent<HTMLFormElement>) => void;
  handleDeleteStudent: (e: FormEvent<HTMLFormElement>) => void;
  handleFormReset: (e: FormEvent<HTMLFormElement>) => void;
}) {
  function getContent(option: string) {
    switch (option) {
      case 'add':
        return (
          <AddStudentForm
            onSubmit={handleAddStudent}
            resetForm={handleFormReset}
          />
        );
      case 'delete':
        return (
          <DeleteStudentForm
            onDelete={handleDeleteStudent}
            resetForm={handleFormReset}
          />
        );
      case 'show all':
        return <StudentList students={data} />;
    }
  }
  return (
    <div className='content-container'>
      <div className='content-close-btn-wrapper'>
        <button onClick={onClose}>x</button>
      </div>
      {operation ? getContent(operation) : <></>}
    </div>
  );
}

export default Content;
