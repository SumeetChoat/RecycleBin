const express = require("express");
const appointmentController = require("../controllers/appointment");
const authenticator = require("../middleware/authenticator");
const appointmentRouter = express.Router();

appointmentRouter.get("/", authenticator, appointmentController.showAll);
appointmentRouter.get("/:id", appointmentController.showOne);
appointmentRouter.post("/", appointmentController.create);
appointmentRouter.delete("/:id", appointmentController.destroy);
appointmentRouter.patch("/:id", appointmentController.update);

module.exports = appointmentRouter;
