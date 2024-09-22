const sharp = require('sharp');
const generatedCode = require('../utils/generadt_code');

const resizedImages = async (images, storagePath , quality=100,width = 1000, height = 1000) => {
    let code=  generatedCode();
    const processedImages = await Promise.all(
      images.map(async (img, index) => {
        const imageName = `${storagePath}-${Date.now()}-${index + 1}-${Math.round(Math.random() * 1E9)}${code}.png`;
  
        await sharp(img.buffer)
          .resize(width, height)
          .toFormat('png')
          .png({ quality })
          .toFile(`storage/${storagePath}/${imageName}`);
  
        return imageName; 
      })
    );
  
    return processedImages; 
  };
  
  module.exports = resizedImages;