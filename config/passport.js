const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models/admin");

module.exports = function (passport) {
	passport.use(
		new localStrategy(
			{
				usernameField: "email",
			},
			(email, password, done) => {
				// MATCH USER
				Admin.findOne({ email: email })
					.then((user) => {
						if (!user) {
							return done(null, false, {
								message: "That email is not registered",
							});
						}
							// console.log("USER:::",user)
						// MATCH PASSWORD
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) throw err;
							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, { message: "Password incorrect" });
							}
						});
					})
					.catch((err) => console.log(err));
			}
		)
	);

	// SERIALIZE AND DESERIALIZE USER
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		Admin.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
