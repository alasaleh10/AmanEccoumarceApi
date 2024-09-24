const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../Config/database');

const FaqQuestion=sequelize.define('faqQuestions',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false
    },
    answer:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false})

module.exports=FaqQuestion