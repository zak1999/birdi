// const mongoose = require('mongoose')
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const uri = process.env.MONGO_URL //|| `127.0.0.1:27017/birdi`


async function connectToDB() {
  console.log("is this shit on the fly")
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://'+uri);
    console.log('Successfully connected to the database 🎉');
  } catch (err) {
    console.log('Mongoose connection err: ' + err);
  }
}
connectToDB();

// module.exports = mongoose;
export default mongoose;