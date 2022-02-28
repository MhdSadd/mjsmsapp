const multer = require("multer");

//multers disk storage settings
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/");
	},
	filename: (req, file, cb) => {
		const datetimestamp = Date.now();
		cb(
			null,
			file.fieldname +
				"-" +
				datetimestamp +
				"." +
				file.originalname.split(".")[file.originalname.split(".").length - 1]
		);
	},
});

const fileFilter = (req, file, callback) => {
  //file filter
  if (
    ["xls", "xlsx"].indexOf(
      file.originalname.split(".")[file.originalname.split(".").length - 1]
    ) === -1
  ) {
    return callback(new Error("Wrong extension type"));
  }
  callback(null, true);
}

const upload = multer({storage, fileFilter})

module.exports = upload;
