
// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const signUpValidation = require('../Features/Auth/Validations/signUpValidation');
const virifyCodeVAildation = require('../Features/Auth/Validations/VirifyCodeValidation');
const loginValidation = require('../Features/Auth/Validations/loginValidation');
const {
     forgetPasswordValidation ,
     sendCodeValidation ,
     restPasswordValidation,
     editMyAccountValidation
} = require('../Features/Auth/Validations/forgetPasswordValidation');
const UserController = require('../Features/Auth/Controller/UserController');
const userController = new UserController();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();
const {uploadSingleImage} = require('../Middleware/UploadImageMiddelware');

router.post('/signUp',
     upload.none(),
      signUpValidation,
      userController.signUp
)  ;
router.post('/virifyCode',
 upload.none(),
virifyCodeVAildation,
userController.virifyCode
);

router.post('/login',
     upload.none(),
     loginValidation,
userController.login
);

router.post('/sendCode',
 sendCodeValidation,
authController.sendCode
);

 router.get('/user',
 authController.cheekToken,
 userController.getAccount
     );
router.put('/restPassword',
     upload.none(),
restPasswordValidation,
 authController.restPassword
);


router.post('/forgetPassword',
forgetPasswordValidation,
authController.forgetPassword
);

router.put('/editMyAccount',

     authController.cheekToken,
     editMyAccountValidation,
     authController.editMyAccount
     );
router.put('/editImage',
// (req,res,next)=>{
//      console.log(req);
//      next();
     
// },
     authController.cheekToken,
     uploadSingleImage('image'),
     authController.editAccountImage


);
module.exports = router;
