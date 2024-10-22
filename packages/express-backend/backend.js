// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user_services.js";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


//function to generate rand ID 
const generateId = () => {
  const letters = Array(3)
    .fill(null)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join('');
  const numbers = Math.floor(Math.random() * 900) + 100; 
  return letters + numbers;
};

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error.message));
});


app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices
    .findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.message));
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId(); 

  userServices
    .addUser(userToAdd)
    .then((savedUser) => res.status(201).send(savedUser))
    .catch((error) => res.status(500).send(error.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).send(`User with id ${id} deleted.`);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});