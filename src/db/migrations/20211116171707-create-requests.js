const TABLE_NAME = 'requests';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemId: {
        type: Sequelize.INTEGER,
        field: 'item_id',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Unconfirmed', 'Accepted', 'Declined'),
        allowNull: false,
        defaultValue: 'Unconfirmed',
      },
      createdBy: {
        type: Sequelize.STRING,
        field: 'created_by',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(TABLE_NAME);
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_requests_status');
  },
};
