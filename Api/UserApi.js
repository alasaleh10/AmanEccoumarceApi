// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const upload = multer();
// const signUpValidation = require('../Features/Auth/Validations/signUpValidation');
// const AuthController = require('../Features/Auth/Controller/AuthController');
// authController=new AuthController();

// router.post('/signUp',upload.none(),
// signUpValidation,
// authController.signUp);


// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const signUpValidation = require('../Features/Auth/Validations/signUpValidation');
const virifyCodeVAildation = require('../Features/Auth/Validations/VirifyCodeValidation');
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();

router.post('/signUp',
     upload.none(), signUpValidation,authController.signUp);

router.post('/virifyCode',
     upload.none(),
virifyCodeVAildation,
authController.virifyCode);

module.exports = router;
