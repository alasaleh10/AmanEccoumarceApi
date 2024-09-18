const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../Config/database');
const Banar=sequelize.define('banars',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
    
})
module.exports = Banar