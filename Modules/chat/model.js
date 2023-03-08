"use strict";
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    message: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const chat = mongoose.model("Chat", ChatSchema);
module.exports = chat;
