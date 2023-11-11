import { useState } from 'react';
import './assets/styles/style.css';
import Content from './components/Content';

export interface IStudent {
  firstName: string;
  lastName: string;
  fatherName?: string;
  group: string;
  birthday: Date;
}

export type IOperation = 'add' | 'delete' | 'show all' | undefined;

function App() {
  const [isContentShown, setIsContentShown] = useState(false);
  // TODO: check if that is a correct way to work with the modal
  const [operation, setOperation] = useState<IOperation>();
  const [data] = useState<IStudent[]>([
    {
      firstName: 'el',
      lastName: 'kheel',
      group: 'ist-171',
      birthday: new Date('1999-09-07'),
    },
  ]);

  function handleAddStudent() {
    setOperation('add');
    setIsContentShown(true);
  }

  function handleDeleteStudent() {
    setOperation('delete');
    setIsContentShown(true);
  }

  function handleShowAllStudents() {
    setOperation('show all');
    setIsContentShown(true);
  }

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
        <br />
        {isContentShown ? (
          <Content
            operation={operation}
            data={data}
            onClose={() => setIsContentShown(false)}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
