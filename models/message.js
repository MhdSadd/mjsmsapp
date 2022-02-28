const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  message_body: {
    type: String,
    required: true
  },
  course: {
    type: String
  },
  level: {
    type: String
  }
},{timestamps:true});

module.exports = {Messages: model("message", messageSchema)};
