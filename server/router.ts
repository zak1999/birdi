import Express from 'express';
import multer from './middleware/imageHandle';
import sightingsControllers from './controllers/sightings.controllers';
import usersControllers from './controllers/users.controller';

const router = Express.Router();

// 'The Request object will be populated with a file 
// object containing information about the processed file.'
router.post('/sightings', multer.single('file'), sightingsControllers.addSightings)
router.get('/sightings',sightingsControllers.collectSightings)
router.post('/delete-bird', sightingsControllers.deleteSighting);
router.get('/health-check', (req, res) => {res.send('so healthy')})

router.post('/users',usersControllers.collectUserInfo)


export default router