// const sharp = require('sharp');
// const asyncHandler = require('express-async-handler');
// exports.resizeImage = (storageFile,width=600,height=600)=>

// asyncHandler(async (req, res) => {
//     const filename = `${storageFile}-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`;
  
//     await sharp(req.file.buffer)
//       .resize(width, height)
//       .toFormat('jpeg')
//       .jpeg({ quality: 95 })
//       .toFile(`storage/${storageFile}/${filename}`);
      


//       return filename;
  
//     //  req.body.image = filename;

  
//     // next();
//   });
//   module.exports=exports.resizeImage;
const sharp = require('sharp');


resizeImage = async (req, storageFile, quality=95, width = 600, height = 600) => {
  const filename = `${storageFile}-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`;

  await sharp(req.file.buffer)
    .resize(width, height)
    .toFormat('jpeg')
    .jpeg({ quality: quality })
    .toFile(`storage/${storageFile}/${filename}`);
   
    

  return filename;
};
module.exports = resizeImage;
