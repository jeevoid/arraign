const {users} = require('../../models');
const userHandler = {};
userHandler.DeleteUser = async (req, res) => {
    users.destroy({
    where: {
        username: req.user.username 
    }
    }).then(() => {
    console.log("Done");
    });
    res.redirect('/signup');
}

userHandler.Logout = async (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/signup'); 
    });
}

module.exports = userHandler;