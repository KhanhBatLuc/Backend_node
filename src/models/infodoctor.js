'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfoDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InfoDoctor.belongsTo(models.User, { foreignKey: 'doctorId' })
      InfoDoctor.belongsTo(models.Allcode,{foreignKey:'priceId', targetKey:'keyMap',as:'priceData'})
      InfoDoctor.belongsTo(models.Allcode,{foreignKey:'provinceId', targetKey:'keyMap',as:'provinceData'})
      InfoDoctor.belongsTo(models.Allcode,{foreignKey:'paymentId', targetKey:'keyMap',as:'paymentData'})
    }
  };
  InfoDoctor.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InfoDoctor',
  });
  return InfoDoctor;
};