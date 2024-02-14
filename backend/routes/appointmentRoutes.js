const controller = require("../controllers/appointmentController.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/addAppointment",
    controller.create
  );

  app.get("/findAppointment", controller.find);

  app.post("/updateAppointment/:id", controller.update);

  app.post("/deleteAppointment/:id",controller.delete);
};