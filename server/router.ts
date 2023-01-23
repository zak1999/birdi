import Express from 'express';

import multer from './middleware/imageHandle';
import sightingsControllers from './controllers/sightings.controllers';
import usersControllers from './controllers/users.controller';

const router = Express.Router();

router.get('/sightings',sightingsControllers.collectSightings)
// 'The Request object will be populated with a file 
// object containing information about the processed file.'
router.post('/sightings',multer.single('file'),sightingsControllers.addSightings)

router.post('/users',usersControllers.collectUserInfo)


// module.exports = router;
export default router