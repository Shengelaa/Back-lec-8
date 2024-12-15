const express = require("express");
const app = express();

app.use(express.json());

// create User CRUD
// C - Create
// R - Read
// U - Update
// D - Delete
const users = [
  {
    id: 1,
    firstName: "Giorgi",
    lastName: "Giorgadze",
    email: "giorgigiorgadze@gmail.com",
  },
  {
    id: 2,
    firstName: "Gela",
    lastName: "Geladze",
    email: "gelageladze@gmail.com",
  },
];

app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  console.log(req.params, "params");
  const id = Number(req.params.id);
  const user = users.find((el) => el.id === id);
  if (!user) res.status(404)({ message: "User Not Found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ message: "Firstname, Lastname, and email are required" });
  }
  res.send("user created");

  const existUser = users.find((el) => el.email === email);
  if (existUser)
    return res.status(400).json({ message: "user already exists" });

  const lastId = users[users.length - 1]?.id || 0;
  const newUser = {
    id: lastId + 1,
    firstName,
    lastName,
    email,
  };
  users.push(newUser);
  res.status(201).json({ message: "user created succesfully", data: newUser });
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((el) => el.id === id);
  if (index === -1) return res.status(400).json({ message: "User Not Found" });

  const deletedUser = users.splice(index, 1);

  res
    .status(200)
    .json({ message: "user deleted successfully", data: deletedUser });
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((el) => el.id === id);
  if (index === -1) return res.status(400).json({ message: "user not found" });
  const { firstName, lastName, email } = req.body;
  if (firstName) users[index].firstName = firstName;
  if (lastName) users[index].lastName = lastName;
  if (email) users[index].email = email;

  res.status(200).json({message: 'user updated succesfully', data: users[index]})
});

app.listen(3000, () => {
  console.log("running on http://localhost:3000");
});
