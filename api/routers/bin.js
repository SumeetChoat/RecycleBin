const express = require("express");
const binController = require("../controllers/bin");
const authenticator = require("../middleware/authenticator");
const binRouter = express.Router();

binRouter.get("/", binController.showAll);
binRouter.get("/:id", binController.showOneById);
binRouter.get("/name/:name", binController.showOneByName);
binRouter.post("/", binController.create);
binRouter.delete("/:id", binController.destroy);
binRouter.patch("/:id", binController.update);

module.exports = binRouter;
