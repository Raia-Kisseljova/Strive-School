import express from 'express'
import createError from 'http-errors'
import UserModel from '../schemas/userSchema.js'

const userRouter = express.Router()

const registerUser = async (req, res, next) => {
  try {

    const newUser = await new UserModel(req.body).save()

    res.status(201).send(newUser._id)

  } catch (error) {
    next(error)
  }
}

// **************FOR ALL****************

userRouter.get("/me", async (req, res, next) => {
  try {

    const user = await UserModel.find({})

    res.send(user)

  } catch (error) {
    next(error)
  }
})

userRouter.get("/me/accommodation", async (req, res, next) => {
  try {

    const user = await UserModel.find({})

    res.send(user)

  } catch (error) {
    next(error)
  }
})




export default userRouter
