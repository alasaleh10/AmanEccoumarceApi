
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const multerOptions = (allowedExtensions = ['.jpg', '.jpeg', '.png']) => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {


    if(!file) return cb(null, false);
    

    if (file.mimetype.startsWith('image')) {
      const fileExtension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new ApiError(400, `الامتدادات المسموحة هي فقط: ${allowedExtensions.join(', ')}`), false);
      }
    } else {
      cb(new ApiError(400, 'يجب أن يكون الملف صورة فقط', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};




exports.uploadSingleImageOptinal = (fieldName) => [
  multerOptions().single(fieldName),
  
];

// exports.uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);
