const bcrypt = require('bcrypt');

const saltRounds = 16;

module.exports = {
  async encrypt(password) {
    return bcrypt.hash(password, saltRounds);
  },

  async compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  },
};
