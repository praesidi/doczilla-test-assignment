import { useState } from 'react';
import Modal from './components/Modal';
import './assets/styles/style.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operation, setOperation] = useState<'add' | 'delete' | undefined>();

  function handleAddStudent() {
    setOperation('add');
    setIsModalOpen(true);
  }

  function handleDeleteStudent() {
    setOperation('delete');
    setIsModalOpen(true);
  }

  function handleShowAllStudents() {}

  return (
    <div className='container'>
      <header>
        <h1>CRUD приложение</h1>
      </header>
      <main>
        <h2>Выберите действие</h2>
        <div className='buttons-container'>
          <button onClick={handleAddStudent}>Добавить студента</button>
          <button onClick={handleDeleteStudent}>Удалить студента</button>
          <button onClick={handleShowAllStudents}>
            Вывести список всех студентов
          </button>
        </div>
      </main>
      {isModalOpen ? (
        <Modal operation={operation} onClose={() => setIsModalOpen(false)} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
