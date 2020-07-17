var express = require('express');
const router = express.Router();


let New = require('../models/database.model');

router.route('/create').post((req, res) => {
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
    .then(() => res.json('New Contact Created!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
module.exports = router;