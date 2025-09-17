const express = require('express')
const db = require('./db/connexion.js')
const userRouter = require('./routes/userRoute.js')
const app = express()

const port = 3000

const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
db()


// calls api for my routes

app.use(express.json())

app.use('/', userRouter)



app.listen(port, () =>{
  console.log("Good ! \nserver running on port", port)
})
