const { DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const { sequelize } = require('../../../Config/database');
const Problem=sequelize.define('problems',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING    
    },
    discription:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isNew:{
        type:DataTypes.BOOLEAN, 
        defaultValue:true,
        allowNull:false
    },
    user:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
  
},
{timestamps:true,
    hooks:{
        beforeCreate: async (problem) =>{
            const now = moment().tz('Asia/Riyadh').format();

            problem.createdAt = now;
            problem.updatedAt = now;

        },
        beforeUpdate : async (problem) =>{
            const now = moment().tz('Asia/Riyadh').format();
            problem.updatedAt = now;
        }
    }

}

)

module.exports = Problem;