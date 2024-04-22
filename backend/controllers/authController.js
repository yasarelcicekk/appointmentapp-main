const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { create } = require("../models/usersModel");

const maxAge = 24 * 60 * 60;

const createToken = (id,rememberMe=1) => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: maxAge * rememberMe
  });
};

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    password: bcrypt.hash(req.body.password, 8),
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
      console.log(req.body.rememberMe)
      const token = createToken(user._id, req.body.rememberMe ? 15 : 1);
      console.log(token)
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000})

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

exports.forgotPassword = async (req, res) => {

  try {
    console.log("backendmail",req.body.email)
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    const fullName = user.name + " " + user.lastName;

    // If user not found, send error message
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a unique JWT token for the user that contains the user's id
    const token = createToken(user._id,1/24)  // 1 hour

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.pass
      },
    });

    // Email configuration
    const mailOptions = {
      from: config.email,
      to: req.body.email,
      subject: "Reset Password",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>KADYAS - Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #121212;
            color: #FFFFFF;
          }
      
          .header {
            background-color: #3ABEDA;
            padding: 20px;
            text-align: center;
          }
      
          .header img {
            width: 200px;
            height: auto;
          }
      
          .header h1 {
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 10px;
          }
      
          .content {
            padding: 20px;
          }
      
          .content h2 {
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 10px;
          }
      
          .content p {
            font-size: 14px;
            line-height: 1.5;
          }
      
          .content a {
            background-color: #3ABEDA;
            color: #FFFFFF;
            padding: 10px 20px;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
          }
      
          .footer {
            background-color: #3ABEDA;
            padding: 20px;
            text-align: center;
          }
      
          .footer p {
            font-size: 12px;
            margin-top: 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="cid:kadyas000" alt="KADYAS Dental Clinic">
          <h1>KADYAS Dental Clinic</h1>
        </div>
      
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>Dear ${fullName},</p>
          <p>You have received this email to reset your KADYAS Dental Clinic account password.</p>
          <p>To reset your password, please click on the following link:</p>
          <a href="http://localhost:3000/resetPassword/${token}">Reset Your Password</a>
          <p>This link is valid for 1 hours.</p>
          <p>If you did not request this email, please contact us immediately to protect your account.</p>
        </div>
      
        <div class="footer">
          <p>&copy; 2024 KADYAS Dental Clinic</p>
          <a href="http://localhost:3000">Visit our website</a> | <a href="http://localhost:3000">Follow us</a>
        </div>
      </body>
      </html>
      
      `
    
    
    ,
    attachments: [{
      filename: 'kadyasbg.png',
      path: '../../3.16mern/frontend/src/img/kadyasbg.png',
      cid: 'kadyas000' //same cid value as in the html img src
  }]
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

}

exports.resetPassword = async (req, res) => {
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    
    // Hash the new password
    req.body.newPassword = await bcrypt.hashSync(req.body.newPassword, 8);

    // Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
}
