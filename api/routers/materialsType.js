const express = require("express");
const materialsTypeController = require("../controllers/materialsType");
const authenticator = require("../middleware/authenticator");
const materialsTypeRouter = express.Router();

materialsTypeRouter.get("/", materialsTypeController.showAll);
materialsTypeRouter.get("/:id", materialsTypeController.showOneById);
materialsTypeRouter.post("/", materialsTypeController.create);
materialsTypeRouter.delete("/:id", materialsTypeController.destroy);
materialsTypeRouter.patch("/:id", materialsTypeController.update);

module.exports = materialsTypeRouter;
