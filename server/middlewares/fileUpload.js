const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, res, cb) => {

        cb(null, './uploads')
    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + file.originalname);
    }

})

const upload = multer({
    storage,

    limits: { fileSize: 2 * 1024 * 1024 },

    fileFilter: (req, file, cb) => {

        const mimetypes = ['image/jpg', 'image/jpeg'];

            if (!mimetypes.includes(file.mimetype)) {
                cb(new Error("File type not supported!"));
            }
            
        cb(null, true);

    }

})

module.exports = upload
