const userModel = require("../schema/users");
const { verify } = require("jsonwebtoken");

const checkPermission = (permission) => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded.email;
      const user = await userModel.findOne({ email: req.user });
      await user.populate({
        path: "role",
      });
      if (user.role.permissions.includes(permission)) {
        next();
      } else {
        res.status(400).json({ status: "You dont have requires Permission" });
        return;
      }
    } else {
      return res.status(401).json({ message: "unauthorized user" });
    }
  };
};
module.exports = {
  checkPermission,
};
