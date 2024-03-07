const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if(token && token !== undefined) {
    try {
      const decoded = jwt.verify(token, config.secret);
      req.userId = decoded.id;
  
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found!" });
      }
  
      next();
      return res.json({ status: true, user });
    } catch (err) {
      return res.status(500).json({ status: false, error: err.message + "token undefined" });
    }
  }
  else {
    res.json({ status: false, error: "token not found" });
    next();

  }

 
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err + "user cant find admin authjwt"});
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err + "cant find role authjwt" });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};



const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;