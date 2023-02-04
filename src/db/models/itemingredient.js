const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemIngredient.init({
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
    ingredientId: {
      type: DataTypes.INTEGER,
      field: 'ingredient_id',
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    modelName: 'ItemIngredient',
    tableName: 'item_ingredients',
    freezeTableName: true,
    paranoid: true,
  });
  return ItemIngredient;
};
