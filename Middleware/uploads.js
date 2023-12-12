const multer = require('multer');

// Setup storage and destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/equipment/'); // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance
const upload = multer({ storage: storage });

// Setup storage and destination
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/jobs/'); // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance
const upload2 = multer({ storage: storage2 });

// Setup storage and destination
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/'); // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance
const upload3 = multer({ storage: storage3 });

// temp file storage and destination
const temp = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/temp/'); // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance
const temp_upload = multer({ storage: temp });

module.exports = {upload,upload2,upload3,temp_upload};
