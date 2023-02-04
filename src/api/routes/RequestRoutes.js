const { Router } = require('express');
const controller = require('../controllers/RequestController');
const Authenticator = require('../middlewares/Authenticator');

const router = new Router();

router.get(
  '/',
  Authenticator.JWTAuthenticate,
  controller.getAllRequests,
);

router.post(
  '/create',
  Authenticator.JWTAuthenticate,
  controller.addNewRequest,
);

router.post(
  '/edit/status',
  Authenticator.JWTAuthenticate,
  controller.updateRequestStatus,
);

module.exports = router;
