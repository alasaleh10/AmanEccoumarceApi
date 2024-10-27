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
    
},
{
    timestamps:false,

    hooks:
    {

        afterFind: (banar) => 
            {
                if(Array.isArray(banar))
                    {
                        banar.forEach((banar) => {
                            if(banar.image)
                                {
  banar.dataValues.image=`${process.env.BASE_URL}/storage/banars/${banar.image}`
                                }
                        
                          
                        })

                    }
                    else if(banar)
                        {
                            if(banar.image)
                                {
  banar.image=`${process.env.BASE_URL}/storage/banars/${banar.image}`
                  }

                        }
    }
    }
}
)
module.exports = Banar