const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: maxAge,
  });
};

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          const token = createToken(user._id);

          res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
          res.send({ message: "User was registered successfully! findone cookie" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      console.log(token)
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 })

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

     

      res.status(200).send({
        id: user._id,
        email: user.email,
        name: user.name,
        lastName:user.lastName,
        age: user.age,
        phoneNumber: user.phoneNumber,
        roles: authorities,
      });
      
    });
    
};

exports.myEndpoint = (req, res) => {
  // Giriş yapmış kullanıcının ID'sini alın
  const userId = getUserId();

  // ...
};

function getUserId() {
  // Token'ı session'dan alın
  const token = req.session.token;

  // Token'ı decode edin
  const decoded = jwt.verify(token, config.secret);

  // UserID'yi alın
  const userId = decoded.id;

  return userId;
}



exports.signout = async (req, res) => {
  try {
    // req.cookies.jwt=null;
    // req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
    console.log("controllersignouterror")
  }
};
