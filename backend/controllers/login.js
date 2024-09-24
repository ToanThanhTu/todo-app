const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  // find using username
  const user = await User.findOne({ username });

  // password validation
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash); // use bcrypt to compare

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  // create the token
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // sign the token
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  // send the token
  response.status(200).send({ token, username: user.username });
});

module.exports = loginRouter;
