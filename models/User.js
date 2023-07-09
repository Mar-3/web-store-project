const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });
// Create a new model using User Schema
const User = module.exports = mongoose.model('User', UserSchema);

// Method for getting a user from the database using user id
module.exports.getUserById = async function(id, callback) {
    const results = await User.findById(id).exec()
    .catch((e) => {throw e;});
    callback(null, results)
}

// Method for getting a user from database using username
module.exports.getUserByUsername = async function(username, callback) {
    const query = {username: username};
    const results = await User.findOne(query).exec();
    console.log(results);
    callback(null, results);
}

// Add a new user to the database
module.exports.addUser = async function(newUser, callback){
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if(err){throw err};
        newUser.password = hash;
        await newUser.save();
    });
    });
};

// Compare given password to the hashed password in the database
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};
