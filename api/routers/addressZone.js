const express = require("express");
const addressZoneController = require("../controllers/addressZone");
const authenticator = require("../middleware/authenticator");
const addressZoneRouter = express.Router();

addressZoneRouter.get("/", addressZoneController.showAll);
addressZoneRouter.get("/:id", addressZoneController.showOneById);
addressZoneRouter.post("/", addressZoneController.create);
addressZoneRouter.delete("/:id", addressZoneController.destroy);
addressZoneRouter.patch("/:id", addressZoneController.update);

module.exports = addressZoneRouter;
