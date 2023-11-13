import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345678",
	database: "db_students",
	timezone: "+00:00",
});

app.get("/", (req, res) => {
	res.json("backend works as it should");
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
		"INSERT INTO students (`firstName`,`lastName`,`fatherName`,`group`,`birthday`) VALUES (?)";

	const values = [
		req.body.firstName,
		req.body.lastName,
		req.body.fatherName,
		req.body.group,
		req.body.birthday,
	];

	db.query(q, [values], (err, data) => {
		if (err) return res.json(err);
		return res.json(data);
	});
});

app.delete("/students/:id", (req, res) => {
	const studentId = req.params.id;
	const q = "DELETE FROM students WHERE id = ? ";

	db.query(q, [studentId], (err, data) => {
		if (err) return res.json(err);
		return res.json(err);
	});
});

app.listen(8800, () => {
	console.log("server is working");
});
