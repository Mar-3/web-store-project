
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/database');


// Register
router.post('/register', async (req, res, next)=> {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser)
    .then(res.json({ success: true, message: "New user registered"}))
    .catch(err => res.json({ success: false, message: "Error in registering a new user: "+err}));
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({success: false, message: "User not found."})
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                  });
          
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    message: 'Successfully logged in',
                    user: {
                        id: user._id,
                        name: user.name,
                        username:user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, message: 'Wrong password'})
            }
        });
    });
});

module.exports = router;