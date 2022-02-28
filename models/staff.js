const { Schema, model } = require("mongoose");

const staffSchema = new Schema(
	{
		first_name: { type: String },
		last_name: { type: String },
		staff_id: { type: String },
		phone: { type: String },
		courses: { type: String },
	},
	{ timestamps: true }
);

module.exports = { staffConvert: model("staff", staffSchema) };
