const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { mysecret } = require('../../config');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  let { username } = req.body;
  username = username.toLowerCase();
  const { password } = req.body;
  if (!username || !password) {
    res.status(STATUS_USER_ERROR).json({ message: 'Must provide a username and a password!', res });
  } else {
    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'No such user found!', res });
        } else {
          const hashedPass = user.password;
          bcrypt
            .compare(password, hashedPass)
            .then(res => {
              if (res === false) throw new Error(); 
            })
            .then(() => {
              const payload = {
                username: user.username
              };
              const token = jwt.sign(payload, mysecret);
              res.json({ token });
            })
            .catch(err => {
              res.status(500).json({ message: 'There wasn an error!', res });
            });
        }         
      });
  };
};

module.exports = {
  login
};