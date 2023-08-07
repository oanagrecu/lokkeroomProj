import express from "express";
import bodyParser from "body-parser";
import path from "path";
import connection from "./dataBaseConnection.js";
import { registerUser } from "./registration.js";
import { loginUser } from "./login.js";
import ejsMate from "ejs-mate";

const app = express();
const PORT = 3000;

// Get the directory path using __dirname
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use ejs-mate as the EJS engine
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Registration and login endpoints
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

// Render the registration and login forms using EJS
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
