import { useState, FormEvent } from 'react';
import { IOperation } from './types';
import useFetch from './hooks/useFetch';
import Content from './components/Content';
import './assets/styles/style.css';

function App() {
  const [isContentShown, setIsContentShown] = useState(false);
  const [operation, setOperation] = useState<IOperation>();
  const [refetch, setRefetch] = useState<boolean>(false);

  const { data, error } = useFetch('http://localhost:8800/students', refetch);

  if (error) return <h1>Error has occurred. Try Again</h1>;

  async function handleAddStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const student = {
      firstName: e.currentTarget.firstName.value,
      lastName: e.currentTarget.lastName.value,
      fatherName: e.currentTarget.fatherName.value,
      group: e.currentTarget.group.value,
      birthday: new Date(e.currentTarget.birthday.value)
        .toISOString()
        .split('T')[0],
    };

    try {
      await fetch('http://localhost:8800/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = e.currentTarget.studentID.value;

    try {
      await fetch(`http://localhost:8800/students/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleFormReset(e: FormEvent<HTMLFormElement>) {
    e.currentTarget.reset();
  }

  function handleClick(operation: IOperation) {
    setOperation(operation);
    setIsContentShown(true);
  }

  return (
    <div className='container'>
      <header>
        <h1>CR(U)D приложение</h1>
      </header>
      <main>
        <h2>Выберите действие</h2>
        <div className='buttons-container'>
          <button onClick={() => handleClick('add')}>Добавить студента</button>
          <button onClick={() => handleClick('delete')}>
            Удалить студента
          </button>
          <button
            onClick={() => {
              setRefetch(!refetch);
              handleClick('show all');
            }}
          >
            Вывести список всех студентов
          </button>
        </div>
        <br />
        {isContentShown ? (
          <Content
            operation={operation}
            data={data}
            onClose={() => setIsContentShown(false)}
            handleAddStudent={handleAddStudent}
            handleDeleteStudent={handleDeleteStudent}
            handleFormReset={handleFormReset}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default App;
