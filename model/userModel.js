let users = [];
let userIdCounter = 1;

function createUser({ username, password, role }) {
  const user = { id: userIdCounter++, username, password, role };
  users.push(user);
  return user;
}

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function validateUser(username, password) {
  const user = findUserByUsername(username);
  if (user && user.password === password) return user;
  return null;
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  validateUser,
  users
};
