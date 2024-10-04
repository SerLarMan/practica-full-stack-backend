const User = require("../api/models/User");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).json("Unauthorized");

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("Unauthorized");
  }
};

module.exports = { isAuth };
