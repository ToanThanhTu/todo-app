const emailsRouter = require("express").Router()
const nodemailer = require("nodemailer")

emailsRouter.post("/send-email", async (request, response) => {
  const body = request.body
  const subject = `New message from ${body.name} via ToDo App`

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.GMAIL_FROM,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: `"No-reply" <${process.env.GMAIL_FROM}>`,
    to: "trevor.tu@outlook.com",
    subject: subject,
    html: body.html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    return response.json(info.response)
  } catch (error) {
    console.log("error: ", error)
    return response.status(500).json({ error: error.message })
  }
})

module.exports = emailsRouter
