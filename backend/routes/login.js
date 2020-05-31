const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config');
var fs = require('fs');
var path = require('path');

const auth = require('../auth');

const User = require('../models/user.model');

router.post('/auth', async (req, res) => {
    try {
      console.log(req.body);
      console.log("test in login");
      const username = req.body.username;
      const pass = req.body.password;
      
      User.findOne({ username: username }, async function(err, user) {
        if (err) {
          return res.status(400).json({ err: 'Could not find user in database ' });
        }
        if (!user) {
          return res
            .status(401)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        console.log(user);
        const isMatch = await bcrypt.compare(pass, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = {
          user: {
            id: user.username,
          },
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              return res.status(400).json({ err: 'Could not sign jwt' });
            }
            res.status(200).json({
              token,
              user_details: {
                username: user.username,
              },
            });
          },
        );
      });
  } catch (e) {
    res.status(400).json({ msg: 'Please enter all details' });
    return;
  }
});
router.post('/register', (req, res) => {
    const data = req.body;
    bcrypt.hash(data.password, 10, function(err, hash) {
        if (err) {
            res.status(400).json({err: 'error processing password'});
            throw err;
        }
        data.password = hash;
        var obj = new User(data);
        obj.save(err => {
        if (err) {
            res.status(400).json({ err: 'error fetching from db' });
        } else {
            res.status(200).json({ status: 'success' });
        }
        });
    });
});
module.exports = router;