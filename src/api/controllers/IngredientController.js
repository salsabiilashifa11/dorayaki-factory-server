const IngredientService = require('../services/IngredientService');
const Response = require('../utils/Response');

module.exports = {
  async getAllIngredients(req, res) {
    try {
      const query = await IngredientService.findAllIngredients();
      res.status(200).send(new Response(true, query, '').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },

  async getIngredientById(req, res) {
    try {
      const query = await IngredientService.findIngredientById(req.params.id);
      res.status(200).send(new Response(true, query, '').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },

  async addIngredient(req, res) {
    try {
      const query = await IngredientService.createIngredient(req.body);
      res.status(200).send(new Response(true, query, 'Done!').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },

  async updateIngredientStock(req, res) {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for await (const el of req.body) {
        await IngredientService.editIngredient(el.id, { stock: el.stock });
      }
      res.status(200).send(new Response(true, {}, 'Done!').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },
};
