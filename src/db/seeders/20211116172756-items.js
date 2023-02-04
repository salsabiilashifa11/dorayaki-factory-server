const TABLE_NAME = 'items';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(TABLE_NAME, [{
      name: 'Dorayaki Belgian Max Choco',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Crunchy Cream',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Almond Chocolate',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Griffin Chocolate',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Hazelnut Crunchy',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Double Cheese',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Cheesy Chocolate',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Cheese O',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Hokkaido Red Bean',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Milky Oreo',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Greentea Matcha',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Dorayaki Tiramisu',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
