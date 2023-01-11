const mongoose = require('../db')

const sightingsSchema = mongoose.Schema({
  comName:{
    type:String,
  },
  sciName:{
    type:String,
  },
  userID:{
    type:String,
  },
  obsDt:{
    type:String,
  },
  
  url:{
    type:String,
  },

  lat:{
    type:Number,
  },
  lng:{
    type:Number,
  },
})

const Sightings = mongoose.model('Sightings',sightingsSchema)

module.exports = Sightings;