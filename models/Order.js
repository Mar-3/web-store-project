const mongoose = require('mongoose');


// Order Schema
const OrderSchema = mongoose.Schema({
    products: {
        type: [],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
}, { collection: 'orders' });

const Order = module.exports = mongoose.model('Order', OrderSchema);


// Find all orders by user id
module.exports.getUserByUsername = async function(userId, callback) {
  const query = {userId: userId};
  const results = await User.find(query).exec();
  callback(null, results);
}

// New order to the database
module.exports.addOrder = async function(newOrder, callback) {
  await newOrder.save();
}