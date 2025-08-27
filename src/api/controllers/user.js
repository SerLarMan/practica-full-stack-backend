const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/token");
const { deleteImgCloudinary } = require("../../utils/deleteCloudinary");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      return res.status(400).json("A user with this email already exists");
    }

    if(req.file) {
      user.image = req.file.path;
    }

    const userDB = await user.save();
    return res.status(201).json(userDB);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("Wrong email or password");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json("Wrong email or password");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(400).json("You can only modify your user");
    }

    const newUser = new User(req.body);
    newUser._id = id;

    if(req.file) {
      const existingUser = await User.findById(id);
      if (existingUser.image) {
        deleteImgCloudinary(existingUser.image);
      }
      newUser.image = req.file.path;
    }

    if (newUser.password) {
      newUser.password = bcrypt.hashSync(newUser.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (user.image) {
      deleteImgCloudinary(user.image);
    }

    return res.status(200).json("User deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteuser,
};
