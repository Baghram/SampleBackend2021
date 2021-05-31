'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Card.hasMany(models.History)
    }
  };
  Card.init({
    cardNumber: DataTypes.STRING,
    CVV: DataTypes.STRING,
    cardName: DataTypes.STRING,
    Username: DataTypes.STRING,
    cardType: {
      type: DataTypes.ENUM,
      values: ['Master', 'Visa']
    },
    cardExpDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};