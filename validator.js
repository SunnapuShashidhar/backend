var { validationResult, check } = require("express-validator")

exports.SignUpValidator = [
  check('email').isEmail().withMessage("email is required"),
  check('name').notEmpty().withMessage('name is required'),
  check('password').isLength({ min: 6 }).withMessage('password should be atleast 6 chacters..!')
]

exports.SignInValidator = [
  check('email').isEmpty().withMessage('message is required'),
  check('password').isLength({ min: 6 }).withMessage("password atleast ")
]

exports.isValidate = (req, res, next) => {
  const error = validationResult(req);
  if (error.length > 0) {
    return res.send({ status: 400, message: error[0], isSuccessful: false })
  }
  next();
}