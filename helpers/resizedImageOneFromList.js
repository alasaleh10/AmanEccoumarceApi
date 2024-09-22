
const sharp = require('sharp');
const generatedCode = require('../utils/generadt_code');

resizedImageOneFromList = async (req, storageFile, quality=95, width = 600, height = 600) => {
let code=  generatedCode();
  const filename = `${storageFile}-${Date.now()}-${Math.round(Math.random() * 1E9)}${code}.jpeg`;

  await sharp(req.files.image[0].buffer)
    .resize(width, height)
    .toFormat('jpeg')
    .jpeg({ quality: quality })
    .toFile(`storage/${storageFile}/${filename}`);
   
    

  return filename;
};
module.exports = resizedImageOneFromList;
