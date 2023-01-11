const Multer = require('multer');

// https://www.npmjs.com/package/multer
// https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js
const multerMidware = Multer({
  storage: Multer.memoryStorage(),
  // limits: { 
  // }
})
module.exports = multerMidware;
