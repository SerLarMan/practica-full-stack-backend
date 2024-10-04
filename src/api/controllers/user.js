const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/token");

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

    const user = await User.findById(id).populate("myList");
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
      return res.status(400).json("Ya existe un usuario con este email");
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
      return res.status(400).json("Contraseña o usuario incorrecto");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json(token);
    } else {
      return res.status(400).json("Contraseña o usuario incorrecto");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(400).json("Solo puedes modificar tu usuario");
    }

    const user = await User.findById(id);
    const newUser = new User(req.body);
    newUser._id = id;
    newUser.myList = [...user.myList, ...newUser.myList];

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

module.exports = { getUsers, getUserById, registerUser, loginUser, updateUser };
