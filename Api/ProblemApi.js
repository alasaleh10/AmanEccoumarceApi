const express = require('express');
const router = express.Router();
const {addProblemValidation} = require('../Features/Problems/validations/ProblemValidation');
const ProblemController = require('../Features/Problems/ProblemController');
const problemController = new ProblemController();
const AuthController = require('../Features/Auth/Controller/AuthController');
const authController = new AuthController();


router.post('/addProblem',
    authController.optinalToken,
    addProblemValidation,
    problemController.addProblem
    );
router.get('/getFaqQusetions',
    problemController.getFaqQusetions
    );




module.exports = router;