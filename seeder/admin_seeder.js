
const {Admin} = require("../models/admin");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')


// connecting to MongoDB with
mongoose
  .connect('mongodb+srv://bulksms:lecturebulksms@lecturebulksms.ow3su.mongodb.net/BULKSMS?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY:::`);
  })
  .catch((err) => {
    console.log(err);
  });

const admin = new Admin({
  name: "Mujaheed",
  email: "smsapp@gmail.com",
  phone: 0700000000000,
  password: "123abc",
});


bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) {
      
      throw err;
    }
    admin.password = hash;
    admin
      .save()
      .then(() => {
        console.log(admin)
        console.log("admin save successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
