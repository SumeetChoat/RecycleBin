const express = require("express");
const objectController = require("../controllers/recyclableObject.js");
const authenticator = require("../middleware/authenticator.js");
const objectRouter = express.Router();

objectRouter.get("/", objectController.showAll);
objectRouter.get("/search/:input", objectController.findInput);
objectRouter.get("/:id", objectController.showOne);
objectRouter.post("/", objectController.create);
objectRouter.delete("/:id", objectController.destroy);
objectRouter.patch("/:id", objectController.update);

module.exports = objectRouter;
