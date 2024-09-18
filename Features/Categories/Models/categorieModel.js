const moment = require('moment-timezone');

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../Config/database');
const Categoriee=sequelize.define('categories',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,    
        autoIncrement:true

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true 
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    createdAt:{
        type:DataTypes.STRING
    },
    updatedAt:{
        type:DataTypes.STRING
    }

},
{
    timestamps:false,
    hooks:{
        beforeCreate:async(categorie)=>{
            const now = moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss');
            categorie.createdAt=now;
            categorie.updatedAt=now;
           
        }
    }
}
);
module.exports=Categoriee;