const globalVariables = (req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("errror");
	res.locals.messages = require("express-messages")(req, res);
	res.locals.user = req.user || null;
	res.locals.session = req.session;

	next();
};
module.exports = globalVariables;
