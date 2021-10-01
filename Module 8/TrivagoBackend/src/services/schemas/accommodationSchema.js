import mongoose from 'mongoose'
import User from './userSchema.js'
const { Schema, model } = mongoose

const accommodationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxGuests: { type: String, required: true },
  city: { type: String, required: true },
  host: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }]
}, {
  timestamps: true
})

export default model("Accommodation", accommodationSchema)