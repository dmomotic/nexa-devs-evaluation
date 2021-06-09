const { response, request, json } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("token");

  //Getting token from headers
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "There is no token in the request" }],
    });
  }

  try {
    //Checking token
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
    //Searching user in database
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        errors: [{ msg: "Invalid token" }],
      });
    }
    req.user = user.toJSON(); //Just to get changed fields
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      errors: [{ msg: "Invalid token" }],
    });
  }
};

module.exports = {
  validateJWT,
};
