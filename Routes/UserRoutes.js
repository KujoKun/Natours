import Express from "express";

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not finished" });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not finished" });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not finished" });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not finished" });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: "error", message: "This route is not finished" });
};

const UserRouter = Express.Router();

UserRouter.route("/").get(getAllUsers).post(createUser);
UserRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default UserRouter;
