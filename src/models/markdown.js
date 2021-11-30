'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Markdown.belongsTo(models.User,{foreignKey:'doctorId'})
    }
  };
  Markdown.init({
    contentHtml: DataTypes.TEXT('long'),
    contentMark: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    doctorId: DataTypes.INTEGER,
    specialityId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true ,
    timestamps: false,
    modelName: 'Markdown',
  });
  return Markdown;
};