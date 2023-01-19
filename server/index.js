const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express()

const router = require('./router')

const port = 3001;

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(port,()=>{
  console.log("Listening on port :",port)
})