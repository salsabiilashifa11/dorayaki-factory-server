const { Router } = require('express');
const controller = require('../controllers/IngredientController');
const Authenticator = require('../middlewares/Authenticator');

const router = new Router();

router.get(
  '/',
  Authenticator.JWTAuthenticate,
  controller.getAllIngredients,
);

router.get(
  '/:id',
  Authenticator.JWTAuthenticate,
  controller.getIngredientById,
);

router.post(
  '/create',
  Authenticator.JWTAuthenticate,
  controller.addIngredient,
);

router.post(
  '/edit/stock',
  Authenticator.JWTAuthenticate,
  controller.updateIngredientStock,
);

module.exports = router;
