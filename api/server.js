require("dotenv").config();

const express = require("express");
// const bcrypt = require("bcrypt");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

const app = express();

// support json data in request body
app.use(express.json());

// const users = [];

// app.get("/users", (req, res) => {
//     res.json(users);
// });

// app.post("/users", (req, res) => {
//     try {
//         authUtil.getHashPassword(req.body.password).then(hashPassword => {
//             const user = { name : req.body.name, password: hashPassword };
//             users.push(user);
//             console.log(user);
//             res.status(201).send();
//         }).catch(err => {
//             res.status(400).send();
//         });
//     }
//     catch(err) {
//         res.status(400).send();
//     }
// });

app.use("/users", userRouter);
app.use("/products", productRouter);


app.listen(process.env.PORT);


