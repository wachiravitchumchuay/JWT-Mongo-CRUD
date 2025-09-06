import { Router } from "express";
import { validator } from '../middlewares/userMiddleware';
import { getUsersController, createUserController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/userController';

const userRouter = Router();
userRouter.route("/")
    .get(getUsersController)
    .post(validator, createUserController);

userRouter.route("/:id")
    .get(validator, getUserByIdController)
    .put(validator, updateUserController)
    .delete(validator, deleteUserController);

export default userRouter;