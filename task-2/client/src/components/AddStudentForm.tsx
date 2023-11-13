import { FormEvent } from 'react';

function AddStudentForm({
  onSubmit,
  resetForm,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        onSubmit(e);
        resetForm(e);
      }}
      className='add-student-form'
    >
      <label htmlFor='firstName'>Имя*</label>
      <input type='text' id='firstName' name='firstName' required />

      <label htmlFor='lastName'>Фамилия*</label>
      <input type='text' id='lastName' name='lastName' required />

      <label htmlFor='fatherName'>Отчество</label>
      <input type='text' id='fatherName' name='fatherName' />

      <label htmlFor='group'>Группа*</label>
      <input type='text' id='group' name='group' required />

      <label htmlFor='birthday'>Дата рождения*</label>
      <input type='date' id='birthday' name='birthday' required />

      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddStudentForm;
