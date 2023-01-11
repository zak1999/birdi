const express = require('express');
const controllers = require('./controllers/sightings.controllers')
const router = express.Router()



router.get('/sightings',controllers.collectSightings)

router.post('/sightings',controllers.addSightings)

module.exports = router;