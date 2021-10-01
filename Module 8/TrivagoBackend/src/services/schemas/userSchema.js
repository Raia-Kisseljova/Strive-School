import mongoose from 'mongoose'
import bcrypt from "bcrypt"


const { Schema, model } = mongoose

const userSchema = new Schema({

  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ["Guest", "Host", "guest", "host"], default: "Guest" },
  password: { type: String, required: true }
}, {
  timestamps: true
})

userSchema.pre("save", async function (next) {
  const newUser = this
  const userPassword = newUser.password

  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(userPassword, 10)
  }
  next()
})

userSchema.statics.checkCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email })
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password)

    if (isMatch) return user
    else return null
  } else {
    return null
  }
}





export default model("User", userSchema)    