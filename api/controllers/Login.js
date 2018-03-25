const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(STATUS_USER_ERROR).json(sendUserError('Must provide a username and a password!', res));
  } else {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.status(404).json(sendUserError('No such user found!', res));
        } else {
          const hashedPass = user.password;
          bcrypt
            .compare(password, hashedPass)
            .then(res => {
              if (res === false) throw new Error(); 
            })
            .then(() => {
              res.json({ success: true });
            })
            .catch(err => {
              res.status(500).json(sendUserError('There wasn an error!', res));
            });
        }         
      });
  };
};

module.exports = {
  login
};