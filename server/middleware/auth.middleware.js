const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    //  Bearer dwklqhdqwlkhdqwl
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized 2" });
    }
    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized 3" });
    }

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized 4" });
  }
};
