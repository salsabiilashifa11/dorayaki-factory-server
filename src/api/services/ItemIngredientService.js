const { ItemIngredient } = require('../../db/models');

module.exports = {
  async createItemIngredient(obj) {
    try {
      return ItemIngredient.create({
        ...obj,
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
