const multer = require('multer');


const upload = multer({
    dest: 'public/users-avatar',
//destination folder is automatically created if it's not available
    limits: {
        fileSize: 5000000 // 5mb
    },
    fileFilter: (req, file, callback) => {
        console.log(file);
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return callback(new Error('Please upload a Picture(PNG or JPEG)'))
        }
        callback(undefined, true);
    }

})

module.exports={upload}