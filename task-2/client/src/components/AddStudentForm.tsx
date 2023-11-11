function AddStudentForm() {
  return (
    <form action='' className='add-student-form'>
      <label htmlFor='first_name'>Имя</label>
      <input type='text' id='first_name' />

      <label htmlFor='last_name'>Фамилия</label>
      <input type='text' id='last_name' />

      <label htmlFor='father_name'>Отчество</label>
      <input type='text' id='father_name' />

      <label htmlFor='group'>Группа</label>
      <input type='text' id='group' />

      <label htmlFor='birthday'>Дата рождения</label>
      <input type='date' id='birthday' />

      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddStudentForm;
