import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from 'mongoose'
import registerRouter from "./services/routes/registerRouter.js"
import loginRouter from "./services/routes/loginRouter.js"
import userRouter from "./services/routes/userRouter.js"
import accomodationRouter from "./services/routes/accommodationRouter.js"
import { badRequestErrorHandler, catchAllErrorHandler, notFoundErrorHandler } from './errorHandlers.js'


const server = express()

const port = process.env.PORT

server.use(express.json())


server.use("/register", registerRouter)
server.use("/login", loginRouter)
server.use("/accommodation", accomodationRouter)
server.use("/user", userRouter)


server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)


mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log('Connection has been established')
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server is running on port ", port)
  })
})

mongoose.connection.on("error", err => {
  console.log("MONGO ERROR: ", err)
})
