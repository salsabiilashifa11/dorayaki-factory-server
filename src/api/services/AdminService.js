const { Admin } = require('../../db/models');

module.exports = {
  async createAdmin(obj) {
    try {
      return Admin.create({
        ...obj,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async findAllAdmins() {
    try {
      return Admin.findAll();
    } catch (err) {
      throw new Error(err);
    }
  },

  async findAdminByEmail(email) {
    try {
      return Admin.findOne({
        where: {
          email,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async editAdmin(id, obj) {
    try {
      return Admin.update({
        ...obj,
      },
      {
        where: {
          id,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};
