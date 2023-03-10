import Sightings from '../models/sightings.models';
import { Storage } from '@google-cloud/storage';
import { Request, Response, NextFunction } from 'express';
import Users from '../models/users.models';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const storage = new Storage();
// @ts-ignore
const storage = new Storage({ credentials: JSON.parse(process.env.GOOGLE_CLOUD_KEY) });
// const bucket = storage.bucket('birdilegacy');
const bucket = storage.bucket('birdi-cw');


/* TO HAVE ACCESS TO THE IMAGES YOU NEED DOWNLOADx`
 * GOOGLE CLOUD SDK
 */

async function collectSightings(req: Request, res: Response) {
  try {
    const results = await Sightings.find();
    res.status(200).send({ data: results, error: null });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ data: null, error: err.message });
  }
}

// https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js
async function addSightings(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.file) {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', (err) => {
        console.log('err from blobStream: ', err);
        res.status(500).send({ data: null, error: err.message });
      });
      blobStream.on('finish', async () => {
        const publicURL = encodeURI(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        const docToBeAdded = { ...req.body, url: publicURL };
        try {
          const result = await Sightings.create(docToBeAdded);
          const old = await Users.findOne({
            _id: new mongoose.Types.ObjectId(docToBeAdded.userID),
          });
          const userResult = await Users.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(docToBeAdded.userID) },
            { birdSightingsIds: [...old!.birdSightingsIds, result._id] }
          );
          res.status(201).send({ data: { result, userResult }, error: null });
          next();
        } catch (err: any) {
          console.log(err);
          res.status(500).send({ data: null, error: err.message });
        }
      });
      blobStream.end(req.file.buffer);
    } else {
      //An upload where the user doesnt upload their own image
      //MAYBE TAKE THIS OUT AND MAKE url neccessary for user sightings
      const docToBeAdded = { ...req.body };
      try {
        const result = await Sightings.create(docToBeAdded);
        res.status(201).send({ data: result, error: null });
      } catch (err: any) {
        console.log(err);
        res.status(500).send({ data: null, error: err.message });
      }
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ data: null, error: err.message });
  }
}

async function deleteSighting(req: Request, res: Response) {
  try {
    const userToUpdate = await Users.findOne({ email: req.body.email });
    const idToRemove: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.body.idToRemove);
    // @ts-ignore
    const indexIdToRemove: number= userToUpdate?.birdSightingsIds.indexOf(idToRemove);
    userToUpdate?.birdSightingsIds.splice(indexIdToRemove, 1);
    await Users.findOneAndUpdate(
      { email: req.body.email },
      { birdSightingsIds: userToUpdate?.birdSightingsIds }
    );
    const updatedUser = await Users.findOne({ email: req.body.email });

    await Sightings.deleteOne({_id: idToRemove})

    res.status(200).send({ data: updatedUser, error: null });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ data: null, error: err.message });
  }
}

export default { collectSightings, addSightings, deleteSighting };
