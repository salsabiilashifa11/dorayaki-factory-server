const ItemService = require('../services/ItemService');
const ItemIngredientService = require('../services/ItemIngredientService');
const Response = require('../utils/Response');

module.exports = {
  async getAllRecipes(req, res) {
    try {
      let recipes = await ItemService.findAllItems();

      for (let i = 0; i < recipes.length; i += 1) {
        recipes[i] = recipes[i].toJSON();
        for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
          const currEl = recipes[i].ingredients[j];
          recipes[i].ingredients[j] = {
            id: currEl.id,
            name: currEl.name,
            quantity: currEl.ItemIngredient.quantity,
          };
        }
      }
      res.status(200).send(new Response(true, recipes, '').createResponse());
    } catch (err) {
      res.status(500).send(new Response(false, err, 'Something went wrong').createResponse());
    }
  },

  async getRecipeById(req, res) {
    try {
      const query = await ItemService.findItemById(req.params.id);
      const recipe = query.toJSON();

      for (let i = 0; i < recipe.ingredients.length; i += 1) {
        const currEl = recipe.ingredients[i];
        recipe.ingredients[i] = {
          id: currEl.id,
          name: currEl.name,
          quantity: currEl.ItemIngredient.quantity,
        };
      }
      res.status(200).send(new Response(true, recipe, '').createResponse());
    } catch (err) {
      res.status(500).send(new Response(false, err, 'Something went wrong').createResponse());
    }
  },

  async addRecipe(req, res) {
    try {
      const { name, ingredients } = req.body;
      const item = await ItemService.createItem({ name });

      const result = { name, ingredients: [] };

      // Iterate ingredients
      // eslint-disable-next-line no-restricted-syntax
      for await (const ingredient of ingredients) {
        // create
        const createdIngredient = await ItemIngredientService.createItemIngredient({
          itemId: item.id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
        });
        result.ingredients.push(createdIngredient);
      }
      res.status(200).send(new Response(true, result, '').createResponse());
    } catch (err) {
      res.status(500).send(new Response(false, err, 'Something went wrong').createResponse());
    }
  },
};
