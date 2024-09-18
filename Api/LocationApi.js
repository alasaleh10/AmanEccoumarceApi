const express = require('express');
const router = express.Router();
const locationValidation = require('../Features/locations/LocationValidation');
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const LocationController = require('../Features/locations/LocationController');
const locationController = new LocationController();

router.post('/add',
    locationValidation,
    authController.cheekToken,
    locationController.addLocation
),

router.get('/my',
    authController.cheekToken,
    locationController.getMyLocations),

router.get('/spicific/:id',
    authController.cheekToken,
    locationController.getSpicificLocation
),

router.delete('/delete/:id',
    authController.cheekToken,  
    locationController.deleteLocation
)



module.exports=router