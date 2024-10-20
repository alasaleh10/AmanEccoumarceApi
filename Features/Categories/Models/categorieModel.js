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
    

},
{
    timestamps:true,
    hooks:{
        beforeCreate:async(categorie)=>{
            const now = moment().tz('Asia/Riyadh').format();
            categorie.createdAt=now;
            categorie.updatedAt=now;
           
        },
        beforeUpdate:async(categorie)=>{
            const now = moment().tz('Asia/Riyadh').format();
            categorie.updatedAt=now;    
        },
        afterFind: async (categories) => {
            if (Array.isArray(categories)) {
            
                categories.forEach((categorie) => {
                    
                categorie.dataValues.createdAt=moment(categorie.createdAt).tz('Asia/Riyadh').format();
                categorie.dataValues.updatedAt=moment(categorie.updatedAt).tz('Asia/Riyadh').format();

                    if (categorie.image) {
                        categorie.image = `${process.env.BASE_URL}/storage/categories/${categorie.image}`;
                    }
                });
            } else if (categories && categories.image) {
                categories.dataValues.createdAt=moment(categories.createdAt).tz('Asia/Riyadh').format();
                categories.dataValues.updatedAt=moment(categories.updatedAt).tz('Asia/Riyadh').format();
                categories.image = `${process.env.BASE_URL}/storage/categories/${categories.image}`;
            }
        },
      
        
           
        
    }
}
);
module.exports=Categoriee;