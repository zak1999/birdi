import { ObjectId } from "mongoose"

interface User {
  _id: ObjectId,
  email: String,
  birdSightingsIds: [ObjectId]
  __v: Number,
}

interface Sightings {
  _id: ObjectId;
  comName: String;
  sciName: String;
  userID: String;
  userEmail: String;
  obsDt: String;
  url: String;
  lat: Number;
  lng: Number;
  __v: Number;
}

interface UserRequest {
  email: String
}

export { User, Sightings, UserRequest };