const moment = require('moment-timezone');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../../Config/database');  
const Location = sequelize.define('locations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    lat: {
        type: DataTypes.STRING
    },
    lng: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.INTEGER
    },
    street: {
        type: DataTypes.STRING,
       
    },
    home: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roomNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING
    },
    isMain: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    
},{
    timestamps: true,
   
  hooks:{
    beforeCreate: async (location) => {
        location.createdAt = moment().tz("Asia/Kabul").format();
    },
    beforeUpdate: async (location) => {
        location.updatedAt = moment().tz("Asia/Kabul").format();
    },

    // afterFind: async(location)=>{




    // }
  }
})

module.exports = Location