'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Allcode,{foreignKey:'positionId', targetKey:'keyMap',as:'positionData'})
      User.belongsTo(models.Allcode,{foreignKey:'gender', targetKey:'keyMap',as:'genderData'})
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      User.hasOne(models.InfoDoctor, { foreignKey: 'doctorId' })
      
    }
  };
  User.init({
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber:DataTypes.STRING,
    image:DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,
    positionId:DataTypes.STRING,
  

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};