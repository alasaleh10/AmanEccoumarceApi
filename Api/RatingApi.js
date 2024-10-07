const express = require('express');
const router = express.Router();
const RatingController = require('../Features/Rating/RatingController');
const ratingController = new RatingController();
const {
    addRatingValidation
} = require('../Features/Rating/RatingValidation');
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();
router.post('/addRating',
    authController.cheekToken,
    addRatingValidation,
    ratingController.addRating
)
module.exports=router