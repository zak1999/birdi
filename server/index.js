const express = require('express');
const cors = require('cors');

const app = express()

const router = require('./router')

const port = 3001;


app.use(router)
app.use(cors())
app.use(express.json())

app.listen(port,()=>{
  console.log("Listening on port :",port)
})