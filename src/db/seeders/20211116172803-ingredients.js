const TABLE_NAME = 'ingredients';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(TABLE_NAME, [{
      name: 'Garam',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Gula',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Cokelat',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Keju',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Tepung',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Susu',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Telur',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Mentega',
      stock: 100,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
