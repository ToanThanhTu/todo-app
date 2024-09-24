const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 4) {
    return response.status(400).json({
      error: "password must be at least 4 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({})
    .populate("todos", {
      content: 1,
      status: 1,
      category: 1,
    })
    .populate("categories", {
      name: 1,
    });

  response.json(users);
});

module.exports = userRouter;
