const controller = require("../controllers/doctorController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/addDoctor",
    controller.create
  );

  app.get("/findDoctor", controller.find);

  app.post("/updateDoctor/:id", controller.update);

  app.post("/deleteDoctor/:id",controller.delete);
};