import express from 'express'
import createError from 'http-errors'
import UserModel from '../schemas/userSchema.js'

const registerRouter = express.Router()

const registerUser = async (req, res, next) => {
  try {

    const newUser = await new UserModel(req.body).save()

    res.status(201).send(newUser._id)

  } catch (error) {
    next(error)
  }
}

registerRouter.route("/").post(registerUser)


export default registerRouter
