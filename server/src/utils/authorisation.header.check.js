const { verifyToken, verifyAdminToken } = require("../utils/jwt.decode");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authenticateUser = async (req, res, next) => {
  const authToken = req.headers.authorization;

  try {
    // IF JWT token is present
    if (authToken) {
      const token = authToken.split(" ").pop();

      console.log("dasdad");

      const _id = await verifyToken(token);

      //   IF decoded ID from JWT verify function returns an _id
      if (_id) {
        const user = await User.findOne({ _id });

        req.user = user;
        return next();
      } else {
        // No _id token invalid

        throw new Error("No _id was decoded");
      }
    }
    return res.status(500).json({ msg: "not authenticated" });
  } catch (error) {
    console.log(error);
    return res.status(498).json({
      msg: "no token",
    });
  }
};

const authenticateAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;
  // console.log(authToken);
  try {
    // IF JWT token is present

    if (authToken) {
      const token = authToken.split(" ").pop();

      const { role, _id } = await verifyAdminToken(token);

      //   IF decoded ID from JWT verify function returns an _id
      if (role === "superuser") {
        req.user = "admin";
        console.log(role);
        return next();
      } else {
        // No _id token invalid

        throw new Error("No _id was decoded");
      }
    } else {
      return res.status(500).json({ msg: "err" });
    }
  } catch (error) {
    console.log(error);
    return res.status(498).json({
      msg: "no token",
    });
  }
};

module.exports = { authenticateAdmin, authenticateUser };
