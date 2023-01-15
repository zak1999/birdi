const express = require('express');

const router = express.Router()

const multer = require('./middleware/imageHandle')
const sightingsControllers = require('./controllers/sightings.controllers')
const usersControllers = require('./controllers/users.controller')


router.get('/sightings',sightingsControllers.collectSightings)
// 'The Request object will be populated with a file 
// object containing information about the processed file.'
router.post('/sightings',multer.single('file'),sightingsControllers.addSightings)

router.post('/users',usersControllers.collectUserInfo)


module.exports = router;