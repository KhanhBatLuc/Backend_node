const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' ,
  logging: false,
  raw:true,
});
sequelize.fn('CONVERT', sequelize.literal('`HTMLContent` USING utf8'))
let connectDb = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = connectDb