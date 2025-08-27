const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteuser,
} = require("../controllers/user");

const { isAuth } = require("../../middleware/auth");
const { upload } = require("../../middleware/file");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", isAuth, upload.single("image"), updateUser);
userRouter.delete("/:id", isAuth, deleteuser);

module.exports = userRouter;
