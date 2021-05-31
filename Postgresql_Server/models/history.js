'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // History.belongsTo(models.Card)
    }
  };
  History.init({
    userID: DataTypes.STRING,
    Id: DataTypes.STRING,
    cardId: DataTypes.STRING,
    Merchant: DataTypes.STRING,
    Success: DataTypes.BOOLEAN,
    createdDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};