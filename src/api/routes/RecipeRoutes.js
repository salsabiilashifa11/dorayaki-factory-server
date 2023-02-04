const { Router } = require('express');
const controller = require('../controllers/RecipeController');
const Authenticator = require('../middlewares/Authenticator');

const router = new Router();

router.get(
  '/',
  Authenticator.JWTAuthenticate,
  controller.getAllRecipes,
);

router.get(
  '/:id',
  Authenticator.JWTAuthenticate,
  controller.getRecipeById,
);

router.post(
  '/create',
  Authenticator.JWTAuthenticate,
  controller.addRecipe,
);

module.exports = router;
