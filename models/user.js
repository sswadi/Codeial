const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

// path module(above) converts the path into string
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
//uploadedAvatar is the function name
//static function(oops concept) ; multer({ storage: storage }) - this attaches the diskstorage on multer with the storage propery, so the properties assigned ie. destination and filename will be assinged to multer; this function basically combines 3 things- multer middleware, avatar schema, controller
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');

userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;