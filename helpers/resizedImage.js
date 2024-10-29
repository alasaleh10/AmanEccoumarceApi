
const sharp = require('sharp');
const generatedCode = require('../utils/generadt_code');

resizeImage = async (req, storageFile, quality=95, width = 600, height = 600) => {
let code=  generatedCode();
  const filename = `${storageFile}-${Date.now()}-${Math.round(Math.random() * 1E9)}${code}.png`;

  await sharp(req.file.buffer)
    .resize(width, height)
    .toFormat('png')
    .png({ quality: quality })
    .toFile(`storage/${storageFile}/${filename}`);
  return filename;
};
module.exports = resizeImage;
