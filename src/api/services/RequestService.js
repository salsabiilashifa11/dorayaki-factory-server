const { Item, Request, Ingredient } = require('../../db/models');

module.exports = {
  async findAllRequests() {
    try {
      return Request.findAll({
        include: [{
          model: Item,
        }],
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async findRequestById(id) {
    try {
      return Request.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async editRequest(id, obj) {
    try {
      return Request.update({
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

  async createRequest(obj) {
    try {
      return Request.create({
        ...obj,
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
