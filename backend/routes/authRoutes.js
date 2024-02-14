const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicatePhoneNumberOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/signout", controller.signout);
};