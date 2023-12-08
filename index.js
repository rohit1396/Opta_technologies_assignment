const express = require("express");
const mysql = require("mysql");

// Initializing express
const app = express();
app.use(express.json());

const port = 3000;

// MYSQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "rohitdb1",
});

connection.connect((err) => {
  if (err) {
    console.log(`Err connecting to mysql database`, err);
    return;
  }
  console.log("Mysql Successfully Connected!");
});

// create row
// app.post("/createschema", async (req, res) => {
//   const { ecode, ename, esalary } = req.body;

//   try {
//     connection.query(
//       "INSERT INTO employee_info (ECode, EName, ESalary) VALUES (?, ?, ?)",
//       [ecode, ename, esalary],
//       (err, results, fields) => {
//         if (err) {
//           console.log("Error While Inerting a Employee into database");
//           return res.status(400).send();
//         }
//         return res.status(201).json({
//           message: "New Employee added successfully",
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// getting employee schema
app.get("/empschema", async (req, res) => {
  try {
    connection.query(
      "DESCRIBE rohitdb1.employee_info",
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res
          .status(200)
          .send(results.map((elem) => `${elem.Field} : ${elem.Type}`));
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("welcome to Opta tech Assessment");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
