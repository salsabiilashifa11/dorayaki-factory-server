const createError = require('http-errors');
const passport = require('../utils/Passport');

module.exports = {
  async LocalAuthenticate(req, res, next) {
    try {
      await passport.authenticate('local')(req, res, next);
    } catch (error) {
      next(createError(400, error));
    }
  },

  async JWTAuthenticate(req, res, next) {
    await passport.authenticate('jwt', { session: false })(req, res, next);
  },
};
