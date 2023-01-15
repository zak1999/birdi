const mongoose = require('../db')
const mongoosey = require('mongoose')
const usersSchema = mongoose.Schema({
  email:{
    type:String,
  },
  birdSightingsIds:{
    type:[{type: mongoosey.Schema.Types.ObjectId, ref: 'Sightings'}]
  }
})

const Users = mongoose.model('Users',usersSchema)

module.exports = Users;