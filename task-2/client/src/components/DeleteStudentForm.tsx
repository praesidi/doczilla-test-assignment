import { FormEvent } from 'react';

function DeleteStudentForm({
  onDelete,
  resetForm,
}: {
  onDelete: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      className='delete-student-form'
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        onDelete(e);
        resetForm(e);
      }}
    >
      <label htmlFor='studentID'>Введите id студента</label>
      <input type='text' id='studentID' />
      <button type='submit'>Удалить</button>
    </form>
  );
}

export default DeleteStudentForm;
