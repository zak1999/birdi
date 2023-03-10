import mongoose from '../db';
import { Sightings } from '../types';

const sightingsSchema = new mongoose.Schema<Sightings>({
  comName: {
    type: String,
    required: true,
  },
  sciName: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  obsDt: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const Sightings = mongoose.model('Sightings',sightingsSchema)

export default Sightings;