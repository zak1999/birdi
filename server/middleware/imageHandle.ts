import Multer from 'multer';

// https://www.npmjs.com/package/multer
const multerMidware = Multer({
  storage: Multer.memoryStorage(),
})

export default multerMidware;


