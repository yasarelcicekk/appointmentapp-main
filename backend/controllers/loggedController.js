const usersign = require("../controllers/authController")

const id = usersign.signin.id
exports.idlog = () =>
{
    console.log(id)
}

