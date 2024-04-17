const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/authController");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicatePhoneNumberOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);
router.post("/", [authJwt.verifyToken]);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/forgotPassword", controller.forgotPassword);
router.post("/resetPassword/:token", controller.resetPassword);

module.exports = router;