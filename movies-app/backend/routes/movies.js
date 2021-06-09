const { Router } = require("express");
const { check } = require("express-validator");

const { moviePost, moviesGet, movieDelete } = require("../controllers/movies");

const { validateJWT } = require("../helpers/jwt-validator");

const { checkFields } = require("../middlewares/check-fields");

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("poster", "Poster is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("imdbRating", "imdbRating is required").not().isEmpty(),
    check("imdbID", "imdbRating is required").not().isEmpty(),
    checkFields,
  ],
  moviePost
);

router.get("/", [validateJWT, checkFields], moviesGet);

router.delete(
  "/:id",
  [validateJWT, check("id", "The id is not valid").isMongoId(), checkFields],
  movieDelete
);

module.exports = router;
