const express = require('express');
const router = express.Router();
const AuthController = require('../Features/Auth/Controller/AuthController');
const {addFavoriteValidation,deleteFavoriteValidation} = require('../Features/Favorite/FavoriteValidation');
authController=new AuthController();
const FavoriteController = require('../Features/Favorite/FavoriteController');
favoriteController=new FavoriteController();


router.post('/addFavorite',
    addFavoriteValidation,
    authController.cheekToken,
    favoriteController.addFavorite
),
router.delete('/deleteFavorite',
    authController.cheekToken,
    deleteFavoriteValidation,
    favoriteController.deleteFavorite
)
router.get('/',
    authController.cheekToken,
    favoriteController.getMyFavorite
)




module.exports = router;