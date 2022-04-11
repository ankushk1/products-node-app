const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    });
    if (!newUser) {
      return res.status(400).json({ message: "Error creating new user" });
    }
    return res
      .status(200)
      .json({ user: newUser, message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid user/ Sign up first" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { _id, email } = user;
    return res
      .status(200)
      .json({ user: { _id, email }, message: "Login successfull" });
  } catch (err) {
    return res.status(500).json({ Success: false, message: err.message });
  }
};
