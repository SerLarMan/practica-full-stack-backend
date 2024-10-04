const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/user");

const { isAuth } = require("../../middleware/auth");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", isAuth, updateUser);

module.exports = userRouter;
