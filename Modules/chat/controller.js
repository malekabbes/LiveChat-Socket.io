"user strict";
const ChatService = require("./service");

module.exports = {
  get: async (req, res) => {
    const chat = await ChatService.get(req.query);
    res.send(chat);
    res.status(200);
  },
  create: async (req, res) => {
    console.log(req.body);
    const chat = await ChatService.create(req.body);
    res.send(chat);
    res.status(200);
  },
};
