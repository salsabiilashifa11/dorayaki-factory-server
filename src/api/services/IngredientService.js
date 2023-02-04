const { Ingredient } = require('../../db/models');

module.exports = {
  async findAllIngredients() {
    try {
      return Ingredient.findAll();
    } catch (err) {
      throw new Error(err);
    }
  },

  async findIngredientById(id) {
    try {
      return Ingredient.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async createIngredient(obj) {
    try {
      return Ingredient.create({
        ...obj,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async editIngredient(id, obj) {
    try {
      return Ingredient.update({
        ...obj,
      }, {
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
