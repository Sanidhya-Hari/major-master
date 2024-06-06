require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const crypto = require("crypto");
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://shuklaanshu914:MPAWuR1FSMo6pO1v@cluster0.cxhxevl.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    ssl: false, 
    tls: false  
  }
);
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});
const userS = mongoose.model("users", userSchema);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.get("/thankyou", (req, res) => {
  res.sendFile(__dirname + "/thankyou.html");
});
app.post("/toregister", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.post("/register", (req, res) => {
  console.log(req.body.email);
  if (req.body.cpass != req.body.pass) {
    res.send("Password didn't match please retry");
  }
  const pass = crypto.createHash("sha256").update(req.body.pass).digest("hex");
  const newdata = new userS({
    email: req.body.email,
    password: pass,
  });
  newdata.save();
  res.sendFile(__dirname + "/thankyou.html");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running"));
