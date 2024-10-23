

const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../../../Config/database'); 
const sendEmail = require('../../../helpers/sendEmail');
const hashedCode = require('../../../helpers/hashedCode');
const ApiErorr = require('../../../utils/ApiError');
const {welcomAmanMessage} = require('../../../helpers/emailMessages');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    virifyCode: {
        type: DataTypes.STRING
    },
    expireCodeDate: {
        type: DataTypes.DATE 
    },
    credit: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "defualtUserImage.jpeg"
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    passwordUpdatedAt: {
        type: DataTypes.DATE 
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            const now = moment().tz('Asia/Riyadh').format();
            

            let code = Math.floor(10000 + Math.random() * 90000).toString();
          
            try {
                console.log(code);
                
                // await sendEmail(
                //     user.email,
                //     welcomAmanMessage(code, user.firstName),
                //     "كود التحقق لحسابك في متجر أمان"
                // );
            } catch (error) {
                throw new ApiErorr(400, 'فشل إرسال البريد الإلكتروني');
            }

            user.virifyCode = hashedCode(code);
            user.password = await bcrypt.hash(user.password, 10);
            user.expireCodeDate = moment().tz('Asia/Riyadh').add(5, 'minutes').format();
            user.createdAt = now; 
            user.updatedAt = now; 
            user.passwordUpdatedAt = now; 
        },
        beforeUpdate: (user) => {
            const now = moment().tz('Asia/Riyadh');
            user.updatedAt = now; 
        },
        afterFind: (user) => {

       user.dataValues.createdAt=moment(user.createdAt).tz('Asia/Riyadh').format();
       user.image=`${process.env.BASE_URL}/storage/users/${user.image}`
        }
    }
});

module.exports = User;
