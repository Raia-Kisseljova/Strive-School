import jwt from "jsonwebtoken"

const tokenAuthentication = async user => {

  const token = await generateAccessToken({ _id: user._id })

}

const generateAccessToken = payload => new Promise((resolve, reject) =>
  jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
    if (err) reject(err)
    resolve(token)
  })
)

const verifyAccessToken = token => {
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) reject(err)
      resolve(decodedToken)
    })
  )

}

// require("crypto").randomBytes(64).toString("hex")