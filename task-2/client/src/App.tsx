import "./assets/styles/style.css";

function App() {
	return (
		<div className="container">
			<header>
				<h1>CRUD приложение</h1>
			</header>
			<main>
				<h2>Выберите действие</h2>
				<div className="buttons-container">
					<button>Добавить студента</button>
					<button>Удалить студента</button>
					<button>Вывести список всех студентов</button>
				</div>
			</main>
		</div>
	);
}

export default App;
