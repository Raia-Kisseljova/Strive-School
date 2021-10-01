import express from 'express'
import createError from 'http-errors'
import UserModel from '../schemas/userSchema.js'
import atob from 'atob'
const loginRouter = express.Router()

const loginAndGenerateToken = async (req, res, next) => {
  try {

    const { email, password } = req.body

    const user = await UserModel

    res.status(201).send(newUser._id)

  } catch (error) {
    next(error)
  }
}

loginRouter.route("/").post(loginAndGenerateToken)


export default loginRouter
