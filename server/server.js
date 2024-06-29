const express = require("express")
const app = express()
const cors = require("cors")
var cookieParser = require('cookie-parser');

require("dotenv").config()

const connectDB = require("./config/db")

const userRouter = require('./routes/user')
const itemRouter = require('./routes/items')

// middlewares
// app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// connect to the mongodb database
connectDB()

app.use('/api/user',userRouter),
app.use('/api/items',itemRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("Server is running on port ", PORT))