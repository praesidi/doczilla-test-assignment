import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345678",
	database: "db_students",
	timezone: "+00:00",
});

app.use(express.json());

app.get("/", (req, res) => {
	res.json("hello from the backend");
});

app.get("/students", (req, res) => {
	const q = "SELECT * FROM students";
	db.query(q, (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.post("/students", (req, res) => {
	const q =
		"INSERT INTO students (`first_name`,`last_name`,`father_name`,`group`,`birthday`) VALUES (?)";
	const values = [
		req.body.first_name,
		req.body.last_name,
		req.body.father_name,
		req.body.group,
		req.body.birthday,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json("student has been added");
	});
});

app.listen(8800, () => {
	console.log("server is alive:)!");
});
