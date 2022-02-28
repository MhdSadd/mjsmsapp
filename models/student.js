const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
	{
		first_name: { type: String },
		last_name: { type: String },
		matric_no: { type: String },
		phone: { type: String },
		level: { type: String },
		courses: [],
	},
	{ timestamps: true }
);

module.exports = { studentConvert: model("student", studentSchema) };
