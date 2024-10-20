const express = require('express');
const router = express.Router();
const AdminUsersController = require('../../Admin/Users/AdminUsersController');
const adminUsersController = new AdminUsersController();
const AuthController = require('../../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const {cheekUserValidation
    ,editCriditAndPoint
} = require('../../Admin/Users/AdminUserValidation');
router.get('/getAllUsers',
    authController.cheekToken,
    authController.cheekisAdmin,
    adminUsersController.getAllUsers
)
router.put('/updateUserCridit/:id?',
    authController.cheekToken,
    authController.cheekisAdmin,
    cheekUserValidation,
    editCriditAndPoint,
    adminUsersController.editCriditAndPoint


)
module.exports = router
