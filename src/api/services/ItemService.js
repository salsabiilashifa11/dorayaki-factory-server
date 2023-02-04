const { Item, Ingredient } = require('../../db/models');

module.exports = {
  async findAllItems() {
    try {
      return Item.findAll({
        include: [{
          model: Ingredient,
          as: 'ingredients',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
        }],
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async findItemById(id) {
    try {
      return Item.findOne({
        where: {
          id,
        },
        include: [{
          model: Ingredient,
          as: 'ingredients',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'ItemIngredient'],
          },
        }],
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async createItem(obj) {
    try {
      return Item.create({
        ...obj,
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
