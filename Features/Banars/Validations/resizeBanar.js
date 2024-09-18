const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
exports.resizeBanar = asyncHandler(async (req, res, next) => {
    const filename = `banar-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`storage/banars/${filename}`);
  
     req.body.image = filename;
  
    next();
  });
  module.exports=exports.resizeBanar;