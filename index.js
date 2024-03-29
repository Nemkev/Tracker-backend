import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import {
  Sync,
  createJog,
  updateJog,
  deleteJog,
  createUser,
  updateUser,
  deleteUser,
  filterDate,
  login,
  authenticateToken,
  testDelete,
  testGet,
  testPost,
  testPut,
} from "./src/controllers/controllers";

mongoose.connect(
  "mongodb+srv://Evgeny:Ntktajy1@eugene-gv2yj.mongodb.net/EvgenyJog",
  {
    useFindAndModify: false,
  }
);

const app = express();
app.use(bodyParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://jog-client.herokuapp.com"],
  })
);

app.post("/sync", authenticateToken, Sync);
app.post("/v1/data/jog", authenticateToken, createJog);
app.put("/v1/data/jog", authenticateToken, updateJog);
app.delete("/v1/data/jog", authenticateToken, deleteJog);
app.post("/v1/data/user", createUser);
app.post("/filterDate", authenticateToken, filterDate);
app.put("/v1/data/user", updateUser);
app.delete("/v1/data/user", deleteUser);

app.delete("/v1/test/echo", testDelete);
app.get("/v1/test/echo", testGet);
app.post("/v1/test/echo", testPost);
app.put("/v1/test/echo", testPut);

app.post("/login", login);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("http://localhost:4000/");
});
