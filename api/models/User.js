const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    minlength: 4, 
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    minlength: 4, 
    unique: true,
    trim: true, 
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6 
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;