const { Router } = require('express');

const userController = require('../controllers/user.js');


const userRouter = Router();

userRouter.get("/:id", userController.getUserById);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/username/:username", userController.getUserByUsername);
userRouter.patch("/points/:username", userController.updatePoints);
userRouter.patch("/address/:username", userController.updateAddressId);
userRouter.patch("/admin/:username", userController.updateIsAdmin);

module.exports = userRouter;
