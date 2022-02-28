require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const routers = require("./routes/index.routes");
const connectDB = require("./config/db");
const globalVariables = require("./config/globalVariables");
const app = express();

// morgan init
app.use(morgan("dev"));

// DB connect
connectDB();

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// path init for static file
app.use(express.static(path.join(__dirname, "public")));

// cookie parser init
app.use(cookieParser());

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configure Express session
app.use(
	session({
		cookie: {
			maxAge: 180 * 60 * 1000,
		},
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 360000, //expire after an hour
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 600 * 6000, // = 1 hour
		}),
	})
);

// flash init
app.use(flash());

// globalvariables Init
app.use(globalVariables)

//passport middleware config
app.use(passport.initialize());
app.use(passport.session());

// passport config
require("./config/passport")(passport);

// routes
routers(app);

module.exports = app;
