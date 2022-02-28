const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
	name: String,
	email: String,
	phone: Number,
	password: String,
	position: String,
	avatar: String,
	avatar_id: String,
});

module.exports = { Admin: model("admin", adminSchema) };
