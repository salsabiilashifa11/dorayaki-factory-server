const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.Item, {
        foreignKey: 'itemId',
      });
    }
  }
  Request.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      field: 'item_id',
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Unconfirmed', 'Accepted', 'Declined'),
      allowNull: false,
      defaultValue: 'Unconfirmed',
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Request',
    tableName: 'requests',
    freezeTableName: true,
    paranoid: true,
  });
  return Request;
};
