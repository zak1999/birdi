const express = require('express');

const router = express.Router()

const multer = require('./middleware/imageHandle')
const controllers = require('./controllers/sightings.controllers')



router.get('/sightings',controllers.collectSightings)
// 'The Request object will be populated with a file 
// object containing information about the processed file.'
router.post('/sightings',multer.single('file'),controllers.addSightings)

module.exports = router;