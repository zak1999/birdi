const Sightings = require('../models/sightings.models')

async function collectSightings (req, res) {
  try {
    const results = await Sightings.find()
    res.status(200).send(results)
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong")
  }
}

async function addSightings (req, res) {
  const docToBeAdded = {...req.body}
  console.log(docToBeAdded)
  //need to check that all required inputs exist

  try {
    //functionality for adding to db
    const result = await Sightings.create(docToBeAdded)
    res.status(201).send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send("Something went wrong, did not add yuor sighting")
  }
}

module.exports = { collectSightings, addSightings}