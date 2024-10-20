const { Sequelize } = require('sequelize');
const oracledb = require('oracledb');



const sequelize = new Sequelize(process.env.BD_NAME,
   process.env.BD_USERNAME,
    process.env.DB_PASSWORD, {
 
    host: process.env.DB_HOST,
    dialect: 'oracle',
    dialectModule: oracledb,
    
    dialectOptions: {
      connectString: process.env.DB_CONNECTIONSTRING,
    
      
    },
    logging: console.log,
  });

const connectDB=async function connectionDB() {
  
        await sequelize.authenticate();
        

      
        console.log('Connection has been established successfully.');
     
}

module.exports = { sequelize, connectDB };