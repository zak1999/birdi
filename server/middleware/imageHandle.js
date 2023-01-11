const Multer = require('multer');

// https://www.npmjs.com/package/multer
const multerMidware = Multer({
  storage: Multer.memoryStorage(),
  // limits: { 
  // }
})
module.exports = multerMidware;
