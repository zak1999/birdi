const Sightings = require('../models/sightings.models')
const { Storage } = require('@google-cloud/storage');
const Users = require('../models/users.models');
const mongoose = require('mongoose')
const storage = new Storage();
// const bucket = storage.bucket(process.env.BUCKET_NAME);
const bucket = storage.bucket('birdi-legacy');


/**TO HAVE ACCESS TO THE IMAGES YOU NEED DOWNLOAD
 * GOOGLE CLOUD SDK
 */


async function collectSightings (req, res) {
  try {
    const results = await Sightings.find()
    res.status(200).send({data: results, error: null})
  } catch (err) {
    console.log(err)
    res.status(500).send({data: null, error: err.message})
  }
}

// https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js
async function addSightings (req, res, next) {
  try {
    if (req.file) {
      console.log("req.file: ",req.file)
      const blob = bucket.file(req.file.originalname)
      const blobStream = blob.createWriteStream()
      
      blobStream.on('error',(err)=>{
        console.log("err from blobStream: ",err)
          res.status(500).send({ data: null, error: err.message });
      })
      blobStream.on('finish', async () =>{
        const publicURL = encodeURI(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
        const docToBeAdded = {...req.body,url:publicURL}
        // console.log("doc being added:", docToBeAdded)
        try {
          const result = await Sightings.create(docToBeAdded)
          const old = await Users.findOne({_id:new mongoose.Types.ObjectId(docToBeAdded.userID)})
          const userResult = await Users.findOneAndUpdate({_id:new mongoose.Types.ObjectId(docToBeAdded.userID)},
            {birdSightingsIds:[...old.birdSightingsIds,result._id]}
          )
          res.status(201).send({ data: { result, userResult }, error: null });
          next()
        } catch (err) {
          console.log(err)
          res.status(500).send({data: null, error: err.message})
          next()
        }    
      })
      blobStream.end(req.file.buffer)
    } else {
    //***********************************************************************/
    //An upload where the user doesnt upload their own image
    //MAYBE TAKE THIS OUT AND MAKE url neccessary for user sightings
      const docToBeAdded = {...req.body}
      // console.log("doc being added:",docToBeAdded)
      try {
        const result = await Sightings.create(docToBeAdded)
        res.status(201).send({data: result, error: null})
      } catch (err) {
        console.log(err)
        res.status(500).send({data: null, error: err.message})
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({data: null, error: err.message});
  }
  
}

module.exports = { collectSightings, addSightings }