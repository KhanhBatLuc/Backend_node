'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InfoDoctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        type: Sequelize.INTEGER
      },
      priceId: {
        type: Sequelize.STRING(50)
      },
      provinceId: {
        type: Sequelize.STRING(100)
      },
      paymentId: {
        type: Sequelize.STRING(50)
      },
      addressClinic: {
        type: Sequelize.STRING(200)
      },
      nameClinic: {
        type: Sequelize.STRING(50)
      },
      note: {
        type: Sequelize.STRING(200)
      },
      count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('InfoDoctors');
  }
};