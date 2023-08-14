var UserSchema = require("../Modules/User");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")

SignUp = async (req, res) => {
  const { email } = req.body;
  const user = await UserSchema.findOne({ email });

  if (user) {
    return res.send({ status: 409, message: "user already exist..!" })
  }
  const { password, name } = req.body;
  const newUser = new UserSchema({
    name: name,
    password: await bcrypt.hash(password, 10),
    email: email
  })
  newUser.save().then((responce) => {
    res.send({ status: 201, message: responce, isSuccessful: true })
  }).catch((err) => {
    res.send({ status: 500, message: err, isSuccessful: false })
  })
}

SignIn = async (req, res) => {
  const { email } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.send({ status: 404, message: "user not found..!" })
  }
  const { password, name } = req.body;

  const userExist = await bcrypt.compare(password, user.password);
  console.log(userExist)
  if (userExist) {
    const token = jwt.sign({ id: user._id, name: name }, process.env.JWT_SCRET, { expiresIn: "2d" })
    return res.send({ status: 201, token, isSuccessful: true })
  } else {
    res.send({ status: 401, message: "Unauthorized User...!", isSuccessful: false })
  }
}
SignInRequired = async (req, res, next) => {
  if (req.headers.authorization) {//req.headers.authorization
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SCRET);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.send({ status: 404, message: "incorrect password..!", isSuccessful: false });
    }
  } else {
    return res.send({ status: 401, message: "Authorization is required to access", isSuccessful: false })
  }
}

module.exports = { SignUp, SignIn, SignInRequired }