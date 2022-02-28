const passport = require("passport");
const { Admin } = require("../models/admin");
const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res, next) => {
	// console.log(req.body)
	passport.authenticate("local", {
		successRedirect: "/admin",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
};

const logoutHandler = async (req, res) => {
	req.logOut();
	req.flash("success_msg", "You are logged out");
	res.redirect("/login");
};
module.exports = { loginAdmin, logoutHandler };
