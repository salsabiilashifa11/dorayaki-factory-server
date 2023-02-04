const { Router } = require('express');
const controller = require('../controllers/AdminController');
const Authenticator = require('../middlewares/Authenticator');

const router = new Router();

router.post(
  '/register',
  controller.register,
);

router.post(
  '/login',
  Authenticator.LocalAuthenticate,
  controller.login,
);

module.exports = router;
