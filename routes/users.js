var express = require('express');

var router = express.Router();
const { SignIn, SignUp, SignInRequired } = require("../Controls/Authontication");
const { SignInValidator, SignUpValidator, isValidate } = require("../validator")
/* GET users listing. */

//--------sign-up
router.post("/sign-up", SignUpValidator, isValidate, SignUp);
//--------sign-in
router.post("/sign-in", SignInValidator, isValidate, SignIn);



router.get('/', SignInRequired, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
