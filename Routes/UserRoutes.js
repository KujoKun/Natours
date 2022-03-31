import Express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./../Controllers/UserController.js";
const UserRouter = Express.Router();

UserRouter.route("/").get(getAllUsers).post(createUser);
UserRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default UserRouter;
