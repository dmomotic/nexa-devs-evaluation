const { Router } = require("express");
const { check } = require("express-validator");

const { userPost } = require("../controllers/users");
const { userExists } = require("../helpers/db-validations");
const { checkFields } = require("../middlewares/check-fields");

const router = Router();

router.post("/", [
  check("email", "A valid email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  check('email').custom( userExists ),
  checkFields,
], userPost);

module.exports = router;