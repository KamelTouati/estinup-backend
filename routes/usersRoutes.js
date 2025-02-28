const router = require("express").Router();
const {
  updateUserProfile,
} = require("../controllers/usersController");
const {
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

router
  .route("/profile/:id")
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfile)

module.exports = router;
