function Modal({
  operation,
  onClose,
}: {
  operation: 'add' | 'delete' | undefined;
  onClose: () => void;
}) {
  return (
    <div className='modal-underlay'>
      <div className='modal-container'>
        <div className='modal-close-btn-wrapper'>
          <button onClick={onClose}>x</button>
        </div>
        <div className='modal-form-wrapper'>
          {operation === 'add' ? <AddForm /> : <></>}
          {operation === 'delete' ? <DeleteForm /> : <></>}
        </div>
      </div>
    </div>
  );
}

function AddForm() {
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
    </form>
  );
}

function DeleteForm() {
  return (
    <form action='' className='delete-student-form'>
      <label htmlFor='student_id'>Введите id студента</label>
      <input type='text' id='student_id' />
      <button>Удалить</button>
    </form>
  );
}

export default Modal;
