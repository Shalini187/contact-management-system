const router = require('express').Router();
const multer = require('multer');
let New = require('../models/database.model');

router.route('/create').post((req, res) => {
    const username = req.body.username;
    const phonenumber = Number(req.body.phonenumber);
    const email = req.body.email;

  
    const newContact = new New({
      username,
      phonenumber,
      email
    });
  
    newContact.save()
    .then(() => res.json('New Contact Created!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;