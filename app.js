var express = require("express");
var app = express();
var server = require("http").createServer(app).listen(3000);
var io = require("socket.io")(server);
var db = require("./config/db");
var Message = require("./Modules/chat/model");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connect to MongoDB
// User Connected
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");
  socket.emit("connected", "Hello Dear client");
  // Typing Event
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
  // Envoi Mail
  socket.on("chat message", (msg, name, date) => {
    io.emit("chat message", { msg, name, date });
    // Save message to database
    const message = new Message({ message: msg, name: name, date: date });
    message
      .save()
      .then(() => {
        console.log("message saved!");
      })
      .catch((error) => {
        console.error("Error saving message:", error);
      });
  });
  // User Disconnected
  socket.on("disconnect", () => {
    console.log("Un utilisateur est déconnecté");
    io.emit("disconnected", "Un utilisateur est déconnecté");
  });
});

app.use(express.static(__dirname + "/public"));
app.use("/api/chat", require("./Modules/chat"));
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});
