const express = require("express");
const router = express.Router();
const ChatController = require("./controller");

router.get("/all", ChatController.get)
.post("/send", ChatController.create);

module.exports = router;
