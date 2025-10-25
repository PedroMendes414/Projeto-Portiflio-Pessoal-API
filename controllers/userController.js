const { registerUser, loginUser } = require('../service/userService');

exports.register = (req, res, next) => {
  try {
    const user = registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  try {
    const result = loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
