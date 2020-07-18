var express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});


let New = require('../models/database.model');


router.route('/create').post(upload.single('image'),(req, res) => {
    const username = req.body.username;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;
    const image = req.body.image;

    const newContact = new New({
      username,
      phonenumber,
      email,
      image
    });
  
    newContact.save()
    .then(() => res.status(200).json(req.file))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
module.exports = router;