const express = require("express");
const weekdayController = require("../controllers/weekday");
const authenticator = require("../middleware/authenticator");
const weekdayRouter = express.Router();

weekdayRouter.get("/", authenticator, weekdayController.showAll);
weekdayRouter.get("/weekday/:weekday", weekdayController.showOneByName);
weekdayRouter.get("/:id", weekdayController.showOneById);
weekdayRouter.post("/", weekdayController.create);
weekdayRouter.delete("/:id", weekdayController.destroy);
weekdayRouter.patch("/:id", weekdayController.update);

module.exports = weekdayRouter;
