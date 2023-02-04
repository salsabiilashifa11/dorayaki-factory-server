const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const AdminService = require('../services/AdminService');
const PasswordHelper = require('./PasswordHelper');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '4867EF1E8D57A8F510D18B29602B9DBD5BB6CF9C825A948403ADF231F66CB517';

passport.use(new JwtStrategy(opts, async (payload, done) => {
  done(null, payload.user);
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (username, password, done) => {
  const admin = await AdminService.findAdminByEmail(username);
  if (admin) {
    if (await PasswordHelper.compare(password, admin.password)) {
      const obj = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      };
      return done(null, obj);
    }
    return done(null, false);
  }
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

module.exports = passport;
