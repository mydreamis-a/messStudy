const bodyParser = require("body-parser");
const { log } = require("console");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 1234;

app.listen(PORT, () => {
  log("localhost:", PORT);
});

app.use("/img", express.static(__dirname + "/image"));
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  const page = fs.readFileSync("5_exercise_login.html", "utf-8");
  res.send(page);
});

app.post("/login", (req, res) => {
  log(req.body);
});
