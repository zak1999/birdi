import mongoose from '../db';
import mongoosey from 'mongoose';

const usersSchema = new mongoose.Schema({
  email:{
    type:String,
  },
  birdSightingsIds:{
    type:[{type: mongoosey.Schema.Types.ObjectId, ref: 'Sightings'}]
  }
})

const Users = mongoose.model('Users',usersSchema)

export default Users;