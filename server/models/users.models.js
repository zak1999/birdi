const mongoose = require('../db')

const usersSchema = mongoose.Schema({
  email:{
    type:String,
  },
  bird_sightings_ids:{
    type:[String],
  }
})

const Users = mongoose.model('Users',usersSchema)

module.exports = Users;