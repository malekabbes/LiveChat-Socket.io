"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"));
module.exports = mongoose;
