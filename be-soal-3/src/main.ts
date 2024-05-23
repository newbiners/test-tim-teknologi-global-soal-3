import express from "express";
import router from "./routers";
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Welcome to backend Project!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

