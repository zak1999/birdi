// const mongoose = require('mongoose')
import mongoose from 'mongoose'

async function connectToDB() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/birdi`)
    console.log("db connected")
  } catch (err) {
    console.log("Error: ",err)
  }
}
connectToDB();

// module.exports = mongoose;
export default mongoose;