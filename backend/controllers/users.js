const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  if (username.length < 3 || username.length > 20 || password.length < 4 || password.length > 20) {
    return response.status(400).json({
      error:
        "Username must be between 3 and 20 characters long. Password must be between 4 and 20 characters long",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get("/", async (_request, response) => {
  const users = await User.find({})
    .populate("todos", {
      content: 1,
      status: 1,
      category: 1,
    })
    .populate("categories", {
      name: 1,
    })

  response.json(users)
})

module.exports = userRouter
