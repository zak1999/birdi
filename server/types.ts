import { ObjectId } from "mongoose"

interface User {
  _id: ObjectId,
  email: String,
  birdSightingsIds: [ObjectId]
  __v: Number,
}

interface Sightings {
  _id: ObjectId,
  comName: String,
  sciName: String,
  userId: String,
  obsDt: Date,
  url: String,
  lat: Number,
  lon: Number,
  __v: Number
}

interface UserRequest {
  email: String
}

export { User, Sightings, UserRequest };