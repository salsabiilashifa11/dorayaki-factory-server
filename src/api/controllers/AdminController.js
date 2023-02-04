const jwt = require('jsonwebtoken');
const AdminService = require('../services/AdminService');
const logger = require('../utils/Logger');
const PasswordHelper = require('../utils/PasswordHelper');
const Response = require('../utils/Response');

const SECRET_KEY = '4867EF1E8D57A8F510D18B29602B9DBD5BB6CF9C825A948403ADF231F66CB517';

module.exports = {
  async login(req, res) {
    logger.log('info', `${req.user.email} logged in`);
    const token = jwt.sign(
      { user: req.user },
      SECRET_KEY,
    );
    res.send({
      user: req.user,
      token,
    });
  },

  async register(req, res) {
    try {
      const currAdmin = await AdminService.findAdminByEmail(req.body.email);
      if (currAdmin) {
        res.status(500).send(new Response(false, {}, 'Email is used, please find a new one').createResponse());
        return;
      }

      const hashedPW = await PasswordHelper.encrypt(req.body.password);

      const admin = await AdminService.createAdmin({
        email: req.body.email,
        name: req.body.name,
        password: hashedPW,
      });
      res.status(200).send(new Response(true, admin, '').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },
};
