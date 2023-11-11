function DeleteStudentForm() {
  return (
    <form action='' className='delete-student-form'>
      <label htmlFor='student_id'>Введите id студента</label>
      <input type='text' id='student_id' />
      <button>Удалить</button>
    </form>
  );
}

export default DeleteStudentForm;
