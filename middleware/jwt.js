const jwt = require("jsonwebtoken");

exports.validateUser = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({ message: "JWT token is required" });
  }

  jwt.verify(token, req.app.get("secretKey"), req.app, function (err, decoded) {
    if (err) {
      res.status(400).json({ message: err.message, status: "false" });
    } else{
      req.body.user = decoded._id
    }
  });

  next();
};
