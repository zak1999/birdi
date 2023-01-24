import Multer from 'multer';

// https://www.npmjs.com/package/multer
const multerMidware = Multer({
  storage: Multer.memoryStorage(),
  // limits: { 
  // }
})
// module.exports = multerMidware;
export default multerMidware;
