import express from 'express'
import createError from 'http-errors'

import AccommodationModel from '../schemas/accommodationSchema.js'

const AccommodationRouter = express.Router()

// ********************FOR ALL**********************

AccommodationRouter.get("/", async (req, res, next) => {
  try {

    const Accommodations = await AccommodationModel.find({}).populate({
      path: "host", select: "fullname role email"
    })

    res.send(Accommodations)

  } catch (error) {
    next(error)
  }
})
AccommodationRouter.get("/:_id", async (req, res, next) => {
  try {

    const accommodationId = req.params._id

    const accomodation = await AccommodationModel.findById(accommodationId) // similar to findOne()

    if (accomodation) {

      res.send(accomodation)

    } else {
      next(createError(404, `Accomodation with id ${accommodationId} not found!`))
    }

  } catch (error) {
    next(error)
  }
})



// **************************FOR HOST**********************
AccommodationRouter.post("/", async (req, res, next) => {
  try {

    const newAccommodation = await new AccommodationModel(req.body).save()

    res.status(201).send(newAccommodation)

  } catch (error) {
    next(error)
  }
})


AccommodationRouter.put("/:_id", async (req, res, next) => {
  try {
    const accommodationId = req.params._id

    const updatedAccommodation = await AccommodationModel.findByIdAndUpdate(accommodationId, req.body, {
      new: true
    })

    if (updatedAccommodation) {
      res.send(updatedAccommodation)
    } else {
      next(createError(404, `Accomodation with id ${accommodationId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

AccommodationRouter.delete("/:_id", async (req, res, next) => {
  try {
    const accommodationId = req.params._id

    const deletedAccommodation = await AccommodationModel.findByIdAndDelete(accommodationId)

    if (deletedAccommodation) {
      res.status(204).send()
    } else {
      next(createError(404, `Accomodation with id ${accommodationId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})


export default AccommodationRouter