const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const userPost = async (req, res = response) => {
  const { email, password } = req.body;
  const user = new User({ email, password });

  // Encoding the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Saving in DB
  await user.save();

  res.json({
    user,
  });
};

module.exports = {
  userPost
} 