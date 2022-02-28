const mongoose = require("mongoose");
const xlstojson = require("xls-to-json");
const xlsxtojson = require("xlsx-to-json");
const upload = require("../config/multer");
const converter = require("../utils/jsonConverter");
const { staffConvert } = require("../models/staff");
const { studentConvert } = require("../models/student");
const credentials = require("../config/AT").credentials;
// Africa's Talking init
const AT = require("africastalking")(credentials);
//initialize AT's SMS service
const sms = AT.SMS;

const Dashboard = async (req, res) => {
	let pageTitle = "Dashboard";
	res.render("admin/dashboard", { pageTitle });
	req.flash("success_msg", "Welcome");
};

const messageGet = async (req, res) => {
	let pageTitle = "Message";
	res.render("admin/message", { pageTitle });
};

// Send Reminder Immediately
const messagePost = async (req, res) => {
	// console.log("body====>", req.body);
	staffConvert
		.find(
			{},
			{
				_id: 0,
				first_name: 0,
				last_name: 0,
				staff_id: 0,
				updatedAt: 0,
				createdAt: 0,
				__v: 0,
			}
		)
		.then(async (staffs) => {
			await studentConvert
				.find(
					{},
					{
						_id: 0,
						first_name: 0,
						last_name: 0,
						matric_no: 0,
						updatedAt: 0,
						courses: 0,
						createdAt: 0,
						__v: 0,
					}
				)
				.then(async (student) => {
					// check if staff and student has that course
					Receivers = [];
					student.map((student) => {
						if (student.level === req.body.level) {
							Receivers.push(student.phone);
						}
						return null;
					});
					staffs.map((staff) => {
						if (staff.courses === req.body.course) {
							Receivers.push(staff.phone);
						}
					});
					// Set the numbers you want to send to in international format
					let international = Receivers.map((receivers) => {
						return `+234${receivers.replace(/^0+/, "")}`;
					});
					// console.log("RECEIVERS", international);

					async function sendMessage() {
						let recievers = international;
						const { subject, message_body } = req.body;
						let message = `${subject.toUpperCase()}${message_body}`;
						// console.log("message====>", message);
						// console.log("phones====>", recievers);
						const options = {
							to: recievers,
							// Set your message
							message: message,
						};

						// That’s it, hit send and we’ll take care of the rest
						sms
							.send(options)
							.then(req.flash("success_msg", "Reminders sent successfully"))
							.catch(req.flash("error_msg", "Sending failed"));
					}
					sendMessage();
					res.redirect("/admin/message");
				});
		});
};

const staffRecordGet = async (req, res) => {
	let pageTitle = "Staff";
	const staffs = await staffConvert.find();
	let count = 1;
	const staffCount = await staffConvert.countDocuments();
	res.render("admin/staff-record", {
		pageTitle,
		staffs,
		staffCount,
		count,
	});
};

const staffRecordPost = async (req, res) => {
	if (!req.file) return req.flash("error_msg", "No file selected");
	await converter(req.file);
	// console.log("REQ OBJ:::", req);
	res.redirect("/admin/staff-record");
	req.flash("success_msg", "Staffs record uploaded successfully");
};

const studentRecordGet = async (req, res) => {
	let pageTitle = "Student";
	const students = await studentConvert.find();
	let count = 1;
	const studentCount = await studentConvert.countDocuments();
	res.render("admin/student-record", {
		pageTitle,
		students,
		studentCount,
		count,
	});
};

const studentRecordPost = async (req, res) => {
	if (!req.file) return req.flash("error_msg", "No file selected");
	await converter(req.file);
	res.redirect("/admin/student-record");
	req.flash("success_msg", "Student record uploaded successfully");
};

module.exports = {
	Dashboard,
	messageGet,
	messagePost,
	staffRecordGet,
	staffRecordPost,
	studentRecordGet,
	studentRecordPost,
};
