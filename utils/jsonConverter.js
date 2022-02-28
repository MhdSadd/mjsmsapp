const xlstojson = require("xls-to-json");
const xlsxtojson = require("xlsx-to-json");
const { staffConvert } = require("../models/staff");
const { studentConvert } = require("../models/student");

const converter = (file, role, res, err) => {
	let exceltojson;
	let data;
	if (err) {
		console.log(err);
		return;
	}
	/** Multer gives us file info in req.file object */
	if (!file) {
		console.log("NO FILE");
		return;
	}
	/** Check the extension of the incoming file and
	 *  use the appropriate module
	 */
	if (
		file.originalname.split(".")[file.originalname.split(".").length - 1] ===
		"xlsx"
	) {
		exceltojson = xlsxtojson;
	} else {
		exceltojson = xlstojson;
	}
	// console.log(req.file.path);
	try {
		exceltojson(
			{
				input: file.path,
				output: null, //since we don't need output.json
			},
			async (err, result) => {
				if (err) {
					return res.json({ error_code: 1, err_desc: err, data: null });
				} else {
					const data = result;
					// console.log(data);
					try {
						if (data.length === 0) return console.log("No data to upload");
						const role = data.map((d) => {
							return d.role == "staff";
						});
						console.log("ROLE", role);
						if (role[0] === true) {
							await staffConvert.insertMany(data).then((docs) => {
								// console.log(
								// 	"success_msg",
								// 	"Staffs record uploaded successfully" + " " + docs
								// );
								return docs;
							});
						} else {
							await studentConvert.insertMany(data).then((docs) => {
								// console.log(
								// 	"success_msg",
								// 	"Staffs record uploaded successfully" + " " + docs
								// );
								return docs;
							});
						}
					} catch (error) {
						console.log("Record upload failed" + " " + error.message);
						return error;
					}
				}
			}
		);
	} catch (err) {
		res.json({ error_code: 1, err_desc: "Corrupted excel file" });
	}
};

module.exports = converter;
