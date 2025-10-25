const { createUser, findUserByUsername, validateUser } = require('../model/userModel');
const { generateToken } = require('./authService');

function registerUser({ username, password, role }) {
  if (findUserByUsername(username)) {
    throw { status: 400, message: 'Usuário já existe' };
  }
  if (!role) role = 'normal';
  return createUser({ username, password, role });
}

function loginUser({ username, password }) {
  const user = validateUser(username, password);
  if (!user) {
    throw { status: 401, message: 'Credenciais inválidas' };
  }
  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  return { token };
}

module.exports = { registerUser, loginUser };
