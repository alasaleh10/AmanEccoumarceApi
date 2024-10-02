const express = require('express');
const router = express.Router();
const {locationValidation,
    setMainLocation

} = require('../Features/locations/LocationValidation');
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
),

router.put('/changeMainLocation/:id?',
    authController.cheekToken,
    setMainLocation,
    locationController.changeMainLocation   
)



module.exports=router