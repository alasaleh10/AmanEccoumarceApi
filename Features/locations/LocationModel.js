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
    createdAt: {
        type: DataTypes.STRING,
        defaultValue: moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    },
    updatedAt: {
        type: DataTypes.STRING,
        defaultValue: moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss')
    }
},{
    timestamps: false,
   
    beforeUpdate: (location) => {
        const now = moment().tz('Asia/Aden').format('yyyy-MM-DD HH:mm:ss');
        location.updatedAt = now;
    }
})

module.exports = Location