const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');

const { generateJWT } = require('../helpers/jwt-generator');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Checking if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Wrong user" }],
      });
    }

    // Checking password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        errors: [{ msg: "Wrong password" }],
      });
    }

    // Getting JWT
    const token = await generateJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  login
}